<?php

namespace App\Repositories\Contracts;

interface TaskRepositoryInterface
{
    public function all();
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}
