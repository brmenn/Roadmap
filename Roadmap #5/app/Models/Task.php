<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// model tugas
class Task extends Model
{
    protected $fillable = ['title', 'description', 'category_id', 'priority', 'status', 'due_date'];

    protected $casts = [
        'due_date' => 'date',
    ];

    // relasi ke kategori
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
