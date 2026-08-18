<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;

class BatchController extends Controller
{
    public function run(Request $request): JsonResponse
    {
        $count = max(1, (int) $request->input('count', 10));

        Artisan::call('batch:run', ['--count' => $count]);

        return response()->json(Cache::get('batch:last'));
    }
}
