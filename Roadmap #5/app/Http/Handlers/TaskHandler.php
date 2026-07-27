<?php

namespace App\Http\Handlers;

use App\Exceptions\TaskNotFoundException;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

// handler buat memproses request tugas
class TaskHandler
{
    public function __construct(
        protected TaskService $taskService
    ) {}

    // function buat ambil semua tugas
    public function handleGetAll(): JsonResponse
    {
        $tasks = $this->taskService->getAllTasks();
        return response()->json($tasks);
    }

    // proses ambil tugas by id
    public function handleGetById(int $id): JsonResponse
    {
        try {
            $task = $this->taskService->findTask($id);
            return response()->json($task);
        } catch (TaskNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    // function buat tugas baru
    public function handleCreate(array $validated): JsonResponse
    {
        try {
            $task = $this->taskService->createTask($validated);
            return response()->json($task, 201);
        } catch (\RuntimeException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode() ?: 400);
        }
    }

    // function update tugas
    public function handleUpdate(int $id, array $validated): JsonResponse
    {
        try {
            $task = $this->taskService->updateTask($id, $validated);
            return response()->json($task);
        } catch (TaskNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    // functio buat hapu tugas
    public function handleDelete(int $id): JsonResponse
    {
        try {
            $this->taskService->deleteTask($id);
            return response()->json(['message' => 'Task deleted successfully']);
        } catch (TaskNotFoundException $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}
