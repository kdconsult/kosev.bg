<?php

use App\Http\Controllers\Admin\CertificatesController as AdminCertificateController;
use App\Http\Controllers\Admin\DeleteMediaController;
use App\Http\Controllers\Admin\ProductsController as AdminProductController;
use App\Http\Controllers\Admin\ProjectsController as AdminProjectController;
use App\Http\Controllers\Admin\ServicesController as AdminServiceController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::resource('services', ServicesController::class)->only(['index', 'show']);
Route::resource('projects', ProjectController::class)->only(['index', 'show']);
Route::resource('products', ProductController::class)->only(['index', 'show']);
Route::inertia('about', 'about')->name('about');
Route::resource('certificates', CertificateController::class)->only(['index', 'show']);
Route::inertia('contacts', 'contacts')->name('contacts');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('projects', AdminProjectController::class);
        Route::resource('products', AdminProductController::class);
        Route::resource('services', AdminServiceController::class);
        Route::resource('certificates', AdminCertificateController::class);
        Route::post('delete-media', DeleteMediaController::class)->name('delete-media');
    });
});

require __DIR__.'/settings.php';
