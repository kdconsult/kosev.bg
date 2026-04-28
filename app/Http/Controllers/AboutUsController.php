<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AboutUsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $translations = __('about');

        return Inertia::render('about', compact('translations'));
    }
}
