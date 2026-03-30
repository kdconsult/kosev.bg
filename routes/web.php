<?php

use App\Http\Controllers\Admin\CertificatesController as AdminCertificateController;
use App\Http\Controllers\Admin\ProductsController as AdminProductController;
use App\Http\Controllers\Admin\ProjectsController as AdminProjectController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::inertia('services', 'services')->name('services');
Route::resource('projects', ProjectController::class)->only(['index', 'show']);
Route::resource('products', ProductController::class)->only(['index', 'show']);
Route::inertia('about', 'about')->name('about');
Route::get('certificates', [CertificateController::class, 'index'])->name('certificates');
Route::inertia('contacts', 'contacts')->name('contacts');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('projects', AdminProjectController::class);
        Route::resource('products', AdminProductController::class);
        Route::resource('certificates', AdminCertificateController::class);
    });
});

require __DIR__.'/settings.php';
