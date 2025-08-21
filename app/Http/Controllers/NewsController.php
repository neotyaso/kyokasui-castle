<?php

namespace App\Http\Controllers;
use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;

class NewsController extends Controller
{
     // ニュース一覧
    public function index()
    {
    $newsList = News::where('status', 'published')
                    ->orderBy('created_at', 'desc')
                    ->get();
    return Inertia::render('News', [
        'newsList' => $newsList
    ]);
    }

    // ニュース詳細
    public function show(News $news)
    {
        if ($news->status !== 'published') {
            abort(404);
        }

        return Inertia::render('News/Show', [
            'news' => $news,
        ]);
    }
}
