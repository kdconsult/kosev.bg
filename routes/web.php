<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\Admin\CategoriesController as AdminCategoryController;
use App\Http\Controllers\Admin\CertificatesController as AdminCertificateController;
use App\Http\Controllers\Admin\DeleteMediaController;
use App\Http\Controllers\Admin\ProductsController as AdminProductController;
use App\Http\Controllers\Admin\ProjectsController as AdminProjectController;
use App\Http\Controllers\Admin\ServicesController as AdminServiceController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\MailController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::resource('services', ServicesController::class)->only(['index', 'show']);
Route::resource('projects', ProjectController::class)->only(['index', 'show']);
Route::resource('products', ProductController::class)->only(['index', 'show']);
Route::get('about', [AboutUsController::class, 'index'])->name('about');
Route::resource('certificates', CertificateController::class)->only(['index', 'show']);
Route::get('contacts', [ContactUsController::class, 'index'])->name('contacts');
Route::post('contact', [MailController::class, '__invoke'])->name('contact.send');
Route::post('locale/{locale}', LocaleController::class)->name('locale.switch');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::resource('projects', AdminProjectController::class);
        Route::resource('products', AdminProductController::class);
        Route::resource('services', AdminServiceController::class);
        Route::resource('categories', AdminCategoryController::class)
            ->only(['index', 'store', 'update', 'destroy']);
        Route::resource('certificates', AdminCertificateController::class);
        Route::post('delete-media', DeleteMediaController::class)->name('delete-media');
    });
});

require __DIR__.'/settings.php';
