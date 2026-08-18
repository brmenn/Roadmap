<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessItemJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Queue;

class QueueController extends Controller
{
    public function enqueue(Request $request): JsonResponse
    {
        $items = $request->input('items', []);
        $items = is_array($items) ? $items : [];

        foreach ($items as $item) {
            ProcessItemJob::dispatch($item);
        }

        return response()->json(['enqueued' => count($items)]);
    }

    public function stats(): JsonResponse
    {
        return response()->json(['waiting' => Queue::size()]);
    }
}
