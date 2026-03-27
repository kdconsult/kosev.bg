<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('services', 'services')->name('services');
Route::resource('projects', \App\Http\Controllers\ProjectController::class)->only(['index', 'show']);
Route::resource('products', \App\Http\Controllers\ProductController::class)->only(['index', 'show']);
Route::inertia('about', 'about')->name('about');
Route::inertia('certificates', 'certificates')->name('certificates');
Route::inertia('contacts', 'contacts')->name('contacts');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
