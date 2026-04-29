<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Http\Resources\Admin\TagResource;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagsController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = min(max(5, (int) $request->input('per_page', 15)), 100);

        return Inertia::render('admin/tags/index', [
            'tags' => TagResource::collection(
                Tag::query()
                    ->withCount(['projects', 'products'])
                    ->when($request->filled('search'), fn ($query) => $query->where('name->bg', 'like', '%'.$request->string('search').'%'))
                    ->latest()
                    ->paginate($perPage)
                    ->withQueryString()
            ),
            'filters' => [
                'search' => $request->string('search')->toString() ?: null,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(StoreTagRequest $request): RedirectResponse
    {
        Tag::create($request->validated());

        return redirect()->back()
            ->with('success', 'Tag created.');
    }

    public function update(UpdateTagRequest $request, Tag $tag): RedirectResponse
    {
        $tag->update($request->validated());

        return redirect()->back()
            ->with('success', 'Tag updated.');
    }

    public function destroy(Tag $tag): RedirectResponse
    {
        $tag->loadCount(['projects', 'products']);

        if (($tag->projects_count + $tag->products_count) > 0) {
            abort(409, 'This tag is already in use.');
        }

        $tag->delete();

        return redirect()->back()
            ->with('success', 'Tag deleted.');
    }
}
