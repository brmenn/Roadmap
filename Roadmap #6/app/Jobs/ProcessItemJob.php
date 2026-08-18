<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ProcessItemJob implements ShouldQueue
{
    use Queueable;

    public array $item;

    public function __construct(array $item)
    {
        $this->item = $item;
    }

    public function handle(): void
    {
        sleep((int) ($this->item['delay'] ?? 1));

        $output = [
            'id' => $this->item['id'],
            'result' => 'processed-' . $this->item['id'],
            'at' => now()->toIso8601String(),
        ];

        Cache::put('result:' . $this->item['id'], $output, 300);

        Log::info('[job] ' . $output['result']);
    }
}
