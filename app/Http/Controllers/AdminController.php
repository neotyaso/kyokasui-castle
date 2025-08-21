<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function contacts()
    {
        $contacts = Contact::latest()
            ->get();

        return Inertia::render('Admin/Contacts', [
            'contacts' => $contacts
        ]);
    }
}
