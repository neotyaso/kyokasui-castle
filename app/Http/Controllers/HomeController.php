<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // 公開済みのニュースを最新3件取得
        $latestNews = News::where('status', 'published')
                          ->orderBy('published_at', 'desc')
                          ->take(3)
                          ->get();

        return Inertia::render('Home', [
            'latestNews' => $latestNews,
        ]);
    }
}
