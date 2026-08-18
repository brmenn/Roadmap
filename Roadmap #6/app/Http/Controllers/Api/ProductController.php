<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function show(string $id): JsonResponse
    {
        $key = "product:{$id}";
        $cached = Cache::get($key);

        if ($cached !== null) {
            return response()->json(['source' => 'cache', 'data' => $cached]);
        }

        $product = [
            'id' => $id,
            'name' => "Product {$id}",
            'price' => random_int(0, 1000),
        ];

        Cache::put($key, $product, 60);

        return response()->json(['source' => 'db', 'data' => $product]);
    }

    public function deleteCache(string $key): JsonResponse
    {
        Cache::forget("product:{$key}");

        return response()->json(['deleted' => $key]);
    }
}
