<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class RunBatchCommand extends Command
{
    protected $signature = 'batch:run {--count=20}';

    protected $description = 'Run batch processing';

    public function handle(): int
    {
        $count = (int) $this->option('count');
        $started = microtime(true);
        $processed = 0;

        foreach (array_chunk(range(1, $count), 5) as $chunk) {
            foreach ($chunk as $_) {
                usleep(100 * 1000);
                $processed++;
            }
        }

        $summary = [
            'total' => $count,
            'processed' => $processed,
            'durationMs' => (int) ((microtime(true) - $started) * 1000),
            'at' => now()->toIso8601String(),
        ];

        Cache::put('batch:last', $summary, 300);

        $this->info("batch done in {$summary['durationMs']}ms ({$summary['processed']}/{$summary['total']})");

        return self::SUCCESS;
    }
}
