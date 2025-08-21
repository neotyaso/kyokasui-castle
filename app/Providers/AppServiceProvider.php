<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // ← 追加

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Vite のプリフェッチはそのまま
        Vite::prefetch(concurrency: 3);

        // 本番環境で HTTPS を強制
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
