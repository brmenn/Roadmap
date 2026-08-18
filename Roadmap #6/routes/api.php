<?php

use App\Http\Controllers\Api\BatchController;
use App\Http\Controllers\Api\MonitorController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\QueueController;
use Illuminate\Support\Facades\Route;

Route::get('/health', [MonitorController::class, 'health']);
Route::get('/metrics', [MonitorController::class, 'metrics']);

Route::get('/products/{id}', [ProductController::class, 'show']);
Route::delete('/cache/{key}', [ProductController::class, 'deleteCache']);

Route::post('/queue', [QueueController::class, 'enqueue']);
Route::get('/queue', [QueueController::class, 'stats']);

Route::post('/batch', [BatchController::class, 'run']);
