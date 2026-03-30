<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\Admin\ProductResource as AdminProductResource;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = min(max(5, (int) $request->input('per_page', 15)), 100);

        return Inertia::render('admin/products/index', [
            'products' => AdminProductResource::collection(
                Product::with(['category', 'tags'])
                    ->when($request->search, fn ($q) => $q->where('title->bg', 'like', '%'.$request->search.'%'))
                    ->latest()
                    ->paginate($perPage)
                    ->withQueryString()
            ),
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/products/create', [
            'categories' => CategoryResource::collection(Category::forProducts()->get()),
            'availableTags' => Tag::all()->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values(),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $category = Category::where('slug', $request->validated('category_slug'))->firstOrFail();

        $product = Product::create([
            'category_id' => $category->id,
            'title' => $request->validated('title'),
            'description' => $request->validated('description'),
        ]);

        if ($request->has('tags')) {
            $tagIds = collect($request->validated('tags'))->map(fn (string $name) => (Tag::where('name->bg', $name)->first()
                    ?? Tag::create(['name' => ['bg' => $name, 'en' => $name]]))->id);

            $product->tags()->sync($tagIds->all());
        }

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created.');
    }

    public function show(Product $product): RedirectResponse
    {
        return redirect()->route('products.show', $product);
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('admin/products/edit', [
            'product' => new AdminProductResource($product->load(['category', 'tags'])),
            'categories' => CategoryResource::collection(Category::forProducts()->get()),
            'availableTags' => Tag::all()->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values(),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $category = Category::where('slug', $request->validated('category_slug'))->firstOrFail();

        $product->update([
            'category_id' => $category->id,
            'title' => $request->validated('title'),
            'description' => $request->validated('description'),
        ]);

        $tagIds = collect($request->input('tags', []))->map(fn (string $name) => (Tag::where('name->bg', $name)->first()
                ?? Tag::create(['name' => ['bg' => $name, 'en' => $name]]))->id);

        $product->tags()->sync($tagIds->all());

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted.');
    }
}
