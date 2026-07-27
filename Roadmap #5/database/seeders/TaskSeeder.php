<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        Task::create([
            'title' => 'Buat desain UI halaman utama',
            'description' => 'Membuat wireframe dan mockup untuk halaman utama aplikasi',
            'category_id' => 1,
            'priority' => 'high',
            'status' => 'in_progress',
            'due_date' => '2026-08-15',
        ]);

        Task::create([
            'title' => 'Implementasi API autentikasi',
            'description' => 'Membuat endpoint login dan register menggunakan JWT',
            'category_id' => 2,
            'priority' => 'high',
            'status' => 'pending',
            'due_date' => '2026-08-20',
        ]);

        Task::create([
            'title' => 'Riset teknologi caching',
            'description' => 'Evaluasi Redis vs Memcached untuk kebutuhan project',
            'category_id' => 3,
            'priority' => 'low',
            'status' => 'completed',
            'due_date' => '2026-07-30',
        ]);

        Task::create([
            'title' => 'Buat database schema',
            'description' => 'Merancang struktur database untuk modul user dan produk',
            'category_id' => 2,
            'priority' => 'medium',
            'status' => 'pending',
            'due_date' => '2026-08-10',
        ]);

        Task::create([
            'title' => 'Setup CI/CD pipeline',
            'description' => 'Konfigurasi GitHub Actions untuk automasi testing dan deployment',
            'category_id' => 4,
            'priority' => 'medium',
            'status' => 'pending',
            'due_date' => '2026-08-25',
        ]);
    }
}
