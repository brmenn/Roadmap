<?php

namespace App\Http\Controllers;

use App\Http\Handlers\TaskHandler;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function __construct(
        protected TaskHandler $taskHandler
    ) {}

    // get semua tugas
    public function index(): JsonResponse
    {
        return $this->taskHandler->handleGetAll();
    }

    // get tugas by id
    public function show(int $id): JsonResponse
    {
        return $this->taskHandler->handleGetById($id);
    }

    // buat tugas baru
    public function store(StoreTaskRequest $request): JsonResponse
    {
        return $this->taskHandler->handleCreate($request->validated());
    }

    // update tugas
    public function update(UpdateTaskRequest $request, int $id): JsonResponse
    {
        return $this->taskHandler->handleUpdate($id, $request->validated());
    }

    // hapus tugas
    public function destroy(int $id): JsonResponse
    {
        return $this->taskHandler->handleDelete($id);
    }
}
