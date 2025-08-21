<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminNewsController extends Controller
{
    //表示
    public function index()
    {
        $news = News::orderBy("created_at", "desc")->get();
        return Inertia::render("Admin/News/Index", [
            "news" => $news
        ]);
    }

    //作成
    public function create()
    {
        return Inertia::render("Admin/News/Create");
    }

    //作成ロード
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'status' => 'required|in:draft,published,hidden',
        ]);

        News::create($validated);

        return redirect()->route('admin.news.index')->with('success', 'お知らせを作成しました。');
    }

    //編集
    public function edit(News $news)
    {
        return Inertia::render("Admin/News/Edit", [
            'news' => $news
        ]);
    }

    //更新
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'status' => 'required|in:draft,published,hidden',
        ]);

        $news->update($validated);

        return redirect()->route('admin.news.index')->with('success', 'お知らせを更新しました。');
    }

    //削除
    public function destroy(News $news)
    {
        $news->delete();
        return redirect()->route('admin.news.index')->with('success', 'お知らせを削除しました。');
    }

    // ステータス切り替え（新規追加）
    public function toggleStatus(News $news)
    {
        $newStatus = $news->status === 'published' ? 'hidden' : 'published';

        $updateData = ['status' => $newStatus];

        // 公開にする場合、published_atを現在時刻に設定
        if ($newStatus === 'published') {
            $updateData['published_at'] = now();
        }

        $news->update($updateData);

        $message = $newStatus === 'published'
            ? 'お知らせを公開しました。'
            : 'お知らせを非公開にしました。';

        return redirect()->back()->with('success', $message);
    }
}
