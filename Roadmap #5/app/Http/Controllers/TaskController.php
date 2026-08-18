<?php

namespace App\Http\Controllers;

use App\Exceptions\TaskNotFoundException;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $taskService
    ) {}

    public function index(): JsonResponse
    {
        return response()->json($this->taskService->getAllTasks());
    }

    public function show(int $id): JsonResponse
    {
        try {
            return response()->json($this->taskService->findTask($id));
        } catch (TaskNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|integer|exists:categories,id',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]);

        try {
            $task = $this->taskService->createTask($validated);
            return response()->json($task, 201);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'sometimes|required|integer|exists:categories,id',
            'priority' => 'sometimes|required|in:low,medium,high',
            'status' => 'sometimes|required|in:pending,in_progress,completed',
            'due_date' => 'nullable|date',
        ]);

        try {
            return response()->json($this->taskService->updateTask($id, $validated));
        } catch (TaskNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $this->taskService->deleteTask($id);
            return response()->json(['message' => 'Task deleted successfully']);
        } catch (TaskNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}
