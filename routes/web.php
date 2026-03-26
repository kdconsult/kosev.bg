<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('services', 'services')->name('services');
Route::inertia('projects', 'projects')->name('projects');
Route::inertia('products', 'products')->name('products');
Route::inertia('about', 'about')->name('about');
Route::inertia('cetificates', 'contacts')->name('certificates');
Route::inertia('contacts', 'contacts')->name('contacts');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
