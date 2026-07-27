<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// model kategori
class Category extends Model
{
    protected $fillable = ['name'];

    // relasi ke tugas
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
