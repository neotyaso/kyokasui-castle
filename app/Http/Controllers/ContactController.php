<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    //フォームを表示
    public function create() {
        return Inertia::render("Contact/Index");
    }

    //送信処理
    public function store(Request $request) {
        $date = $request->validate([
            "name"=> ["required","string","max:255"],
            "email"=> ["required","email"],
            "message" => ["required","string","max:2000"],
        ]);

        //DBの保存
        Contact::create($date);

        //送信後のページにリダイレクト
        return redirect()->route("contact.thanks")->with("success","送信しました");
    }

    //送信完了ページを表示
    public function thanks() {
        return Inertia::render("Contact/Thanks");
    }
}
