<?php

namespace App\Exceptions;

use RuntimeException;

// exception custom kalau tugas ga ditemukan
class TaskNotFoundException extends RuntimeException
{
    public function __construct(int $id)
    {
        parent::__construct("Task with id {$id} not found", 404);
    }
}
