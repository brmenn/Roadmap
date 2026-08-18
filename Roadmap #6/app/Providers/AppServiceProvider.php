<?php

namespace App\Providers;

use Illuminate\Cache\Events\CacheHit;
use Illuminate\Cache\Events\CacheMissed;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        Event::listen(function (CacheHit $event): void {
            if (str_starts_with($event->key, 'product:')) {
                Redis::connection()->incr('cache:hits');
            }
        });

        Event::listen(function (CacheMissed $event): void {
            if (str_starts_with($event->key, 'product:')) {
                Redis::connection()->incr('cache:misses');
            }
        });
    }
}
