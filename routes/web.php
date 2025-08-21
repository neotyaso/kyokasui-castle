<?php

use App\Http\Controllers\NewsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminNewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

// ---------- 公開サイト側 ----------

// トップページ
Route::get('/', fn() => Inertia::render('Home'));

// 見どころ
Route::get('/highlight', fn() => Inertia::render('Highlight'));

// ヒストリー
Route::get('/history', fn() => Inertia::render('History'));

//ニュースのホーム表示用
Route::get('/', [HomeController::class, 'index']);

// アクセス
Route::get('/access', fn() => Inertia::render('Access'));

// お問い合わせフォーム
Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/contact/thanks', [ContactController::class, 'thanks'])->name('contact.thanks');

// ニュース（公開側）
Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{news}', [NewsController::class, 'show'])->name('news.show');


// ---------- 管理画面(Breeze追加分) ----------
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ---------- 管理画面（まとめて1つのグループに） ----------
Route::middleware(['auth'])->prefix('admin')->group(function() {
    Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/contacts', [AdminController::class, 'contacts'])->name('admin.contacts');

    // お知らせ管理
    Route::get('/news', [AdminNewsController::class, 'index'])->name('admin.news.index');
    Route::get('/news/create', [AdminNewsController::class, 'create'])->name('admin.news.create');
    Route::post('/news', [AdminNewsController::class, 'store'])->name('admin.news.store');
    Route::get('/news/{news}/edit', [AdminNewsController::class, 'edit'])->name('admin.news.edit');
    Route::put('/news/{news}', [AdminNewsController::class, 'update'])->name('admin.news.update');
    Route::delete('/news/{news}', [AdminNewsController::class, 'destroy'])->name('admin.news.destroy');
    Route::patch('/news/{news}/toggle-status', [AdminNewsController::class, 'toggleStatus'])
        ->name('admin.news.toggle-status');
});

require __DIR__.'/auth.php';
