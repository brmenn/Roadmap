<?php

use Illuminate\Support\Facades\Route;

// halaman utama
Route::get('/', function () {
    return response()->json(['message' => 'Task Manager API']);
});
