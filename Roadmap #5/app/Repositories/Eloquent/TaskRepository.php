<?php

namespace App\Repositories\Eloquent;

use App\Models\Task;
use App\Repositories\Contracts\TaskRepositoryInterface;

// implementasi repository pake eloquent
class TaskRepository implements TaskRepositoryInterface
{
    public function all()
    {
        return Task::with('category')->get();
    }

    public function findById(int $id)
    {
        return Task::with('category')->find($id);
    }

    public function create(array $data)
    {
        return Task::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $task = $this->findById($id);
        if (!$task) {
            return false;
        }
        return $task->update($data);
    }

    public function delete(int $id): bool
    {
        $task = $this->findById($id);
        if (!$task) {
            return false;
        }
        return $task->delete();
    }
}
