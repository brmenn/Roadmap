<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Redis;

class MonitorController extends Controller
{
    public function health(): JsonResponse
    {
        Redis::connection()->ping();

        return response()->json(['status' => 'ok', 'at' => now()->toIso8601String()]);
    }

    public function metrics(): JsonResponse
    {
        $info = Redis::connection()->info();

        return response()->json([
            'uptime' => (int) ($info['Server']['uptime_in_seconds'] ?? 0),
            'redis' => [
                'dbSize' => Redis::connection()->dbSize(),
                'usedMemory' => $info['Memory']['used_memory_human'] ?? '0',
            ],
            'queue' => ['waiting' => Queue::size()],
            'cache' => [
                'hits' => (int) Redis::connection()->get('cache:hits'),
                'misses' => (int) Redis::connection()->get('cache:misses'),
            ],
        ]);
    }
}
