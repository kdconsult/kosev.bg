<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\ServiceResource;
use App\Models\Product;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('welcome', [
            'services' => ServiceResource::collection(
                Service::with(['specs'])->active()->get()
            ),
            'featuredProducts' => ProductResource::collection(
                Product::with(['category'])->take(3)->get()
            ),
        ]);
    }
}
