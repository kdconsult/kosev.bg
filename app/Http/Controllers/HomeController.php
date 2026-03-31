<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('welcome', [
            'featuredProducts' => ProductResource::collection(
                Product::with(['category'])->take(3)->get()
            ),
        ]);
    }
}
