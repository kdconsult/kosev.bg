<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('products/index', [
            'products' => ProductResource::collection(
                Product::with(['category', 'tags'])->get()
            ),
            'categories' => CategoryResource::collection(
                Category::forProducts()->withItems()->get()
            ),
        ]);
    }

    public function show(Product $product): Response
    {
        return Inertia::render('products/show', [
            'product' => new ProductResource(
                $product->load(['category', 'tags', 'specs', 'services'])
            ),
        ]);
    }
}
