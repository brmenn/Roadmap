<?php

namespace App\Services;

use App\Exceptions\TaskNotFoundException;
use App\Repositories\Contracts\TaskRepositoryInterface;

class TaskService
{
    public function __construct(
        protected TaskRepositoryInterface $taskRepo
    ) {}

    // ambil semua tugas
    public function getAllTasks()
    {
        return $this->taskRepo->all();
    }

    // cari tugas by id
    public function findTask(int $id)
    {
        $task = $this->taskRepo->findById($id);
        if (!$task) {
            throw new TaskNotFoundException($id);
        }
        return $task;
    }

    // buat tugas baru
    public function createTask(array $data): array
    {
        $task = $this->taskRepo->create($data);
        return $task->load('category')->toArray();
    }

    // update tugas
    public function updateTask(int $id, array $data): array
    {
        $task = $this->taskRepo->findById($id);
        if (!$task) {
            throw new TaskNotFoundException($id);
        }

        $this->taskRepo->update($id, $data);

        return $this->taskRepo->findById($id)->load('category')->toArray();
    }

    // hapus tugas
    public function deleteTask(int $id): void
    {
        $task = $this->taskRepo->findById($id);
        if (!$task) {
            throw new TaskNotFoundException($id);
        }

        $this->taskRepo->delete($id);
    }
}
