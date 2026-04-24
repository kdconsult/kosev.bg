<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Http\Resources\Admin\ServiceResource as AdminServiceResource;
use App\Models\Product;
use App\Models\Service;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = min(max(5, (int) $request->input('per_page', 15)), 100);

        return Inertia::render('admin/services/index', [
            'services' => AdminServiceResource::collection(
                Service::with(['products', 'tags', 'specs'])
                    ->when($request->search, fn ($q) => $q->where('name->bg', 'like', '%'.$request->search.'%'))
                    ->latest()
                    ->paginate($perPage)
                    ->withQueryString()
            ),
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/create', [
            'availableProducts' => Product::all()->map(fn ($product) => [
                'slug' => $product->slug,
                'name' => $product->getTranslation('title', 'bg') ?: $product->getTranslation('title', 'en'),
            ])->values(),
            'availableTags' => Tag::all()->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values(),
        ]);
    }

    public function store(StoreServiceRequest $request): RedirectResponse
    {
        $service = Service::create($request->safe()->only(['name', 'description', 'is_active']));

        if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
            $service->addMediaFromRequest('cover_image')
                ->toMediaCollection('cover_image', 'media');
        }

        if ($request->hasFile('images')) {
            $service->addMultipleMediaFromRequest(['images'])
                ->each(fn ($fileAdder) => $fileAdder->toMediaCollection('images', 'media'));
        }

        $tagIds = collect($request->validated('tags', []))->map(fn (string $name) => (Tag::where('name->bg', $name)->first()
            ?? Tag::create(['name' => ['bg' => $name, 'en' => $name]]))->id);

        $service->tags()->sync($tagIds->all());

        $productIds = Product::whereIn('title->bg', $request->validated('products', []) ?? [])->pluck('id');
        $service->products()->sync($productIds->all());

        foreach ($request->validated('specs', []) as $i => $specData) {
            $service->specs()->create([
                'label' => $specData['label'],
                'value' => $specData['value'],
                'sort_order' => $i,
            ]);
        }

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created.');
    }

    public function show(Service $service): RedirectResponse
    {
        return redirect()->route('services.show', $service);
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => new AdminServiceResource($service->load(['products', 'tags', 'specs'])),
            'coverImageUrl' => $service->coverImage()?->getUrl() ?? null,
            'images' => $service->getMedia('images')->map(fn ($media) => ['url' => $media->getUrl('thumb'), 'alt' => $service->name, 'id' => $media->id]),
            'availableProducts' => Product::all()->map(fn ($product) => [
                'slug' => $product->slug,
                'name' => $product->getTranslation('title', 'bg') ?: $product->getTranslation('title', 'en'),
            ])->values(),
            'availableTags' => Tag::all()->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values(),
        ]);
    }

    public function update(UpdateServiceRequest $request, Service $service): RedirectResponse
    {
        $service->update($request->safe()->only(['name', 'description', 'is_active']));

        if ($request->hasFile('cover_image') && $request->file('cover_image')->isValid()) {
            $service->addMediaFromRequest('cover_image')
                ->toMediaCollection('cover_image', 'media');
        }

        if ($request->hasFile('images')) {
            $service->addMultipleMediaFromRequest(['images'])
                ->each(fn ($fileAdder) => $fileAdder->toMediaCollection('images', 'media'));
        }

        $tagIds = collect($request->validated('tags', []))->map(fn (string $name) => (Tag::where('name->bg', $name)->first()
            ?? Tag::create(['name' => ['bg' => $name, 'en' => $name]]))->id);

        $service->tags()->sync($tagIds->all());

        $productIds = Product::whereIn('title->bg', $request->validated('products', []) ?? [])->pluck('id');
        $service->products()->sync($productIds->all());

        $service->specs()->delete();

        foreach ($request->validated('specs', []) as $i => $specData) {
            $service->specs()->create([
                'label' => $specData['label'],
                'value' => $specData['value'],
                'sort_order' => $i,
            ]);
        }

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->tags()->detach();
        $service->products()->detach();
        $service->specs()->delete();
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted.');
    }
}
