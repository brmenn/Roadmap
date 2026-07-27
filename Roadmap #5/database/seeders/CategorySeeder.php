<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::create(['name' => 'Design']);
        Category::create(['name' => 'Backend']);
        Category::create(['name' => 'Riset']);
        Category::create(['name' => 'DevOps']);
    }
}
