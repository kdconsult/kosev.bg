<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\Admin\ProjectResource as AdminProjectResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProjectResource;
use App\Models\Category;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = min(max(5, (int) $request->input('per_page', 15)), 100);

        return Inertia::render('admin/projects/index', [
            'projects' => ProjectResource::collection(
                Project::with(['category', 'tags'])
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
        return Inertia::render('admin/projects/create', [
            'categories' => CategoryResource::collection(Category::forProjects()->get()),
            'availableTags' => Tag::all()->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values(),
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $project = Project::create($request->safe()->only(['title', 'description', 'category_id']));

        if ($request->hasFile('coverImage') && $request->file('coverImage')->isValid()) {
            $project->addMediaFromRequest('coverImage')->toMediaCollection('cover_image');
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $project->addMedia($image)->toMediaCollection('images');
            }
        }

        $tagIds = collect($request->validated('tags', []))->map(fn (string $name) => (Tag::where('name->bg', $name)->first()
            ?? Tag::create(['name' => ['bg' => $name, 'en' => $name]]))->id);

        $project->tags()->sync($tagIds->all());

        foreach ($request->validated('specs', []) as $i => $specData) {
            $project->specs()->create([
                'label' => $specData['label'],
                'value' => $specData['value'],
                'sort_order' => $i,
            ]);
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function show(Project $project): RedirectResponse
    {
        return redirect()->route('projects.show', $project);
    }

    public function edit(Project $project): Response
    {
        $coverImage = $project->getFirstMedia('cover_image');

        return Inertia::render('admin/projects/edit', [
            'project' => new AdminProjectResource($project->load(['category', 'tags', 'specs'])),
            'categories' => CategoryResource::collection(Category::forProjects()->get()),
            'availableTags' => Tag::all()->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values(),
            'coverImageUrl' => $coverImage?->getUrl(),
            'coverImageAlt' => $coverImage?->getCustomProperty('alt'),
            'images' => $project->images()->map(fn ($image) => ['id' => $image->id, 'thumbUrl' => $image->getUrl('thumb')]),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($request->safe()->only(['title', 'description', 'category_id']));

        if ($request->hasFile('coverImage') && $request->file('coverImage')->isValid()) {
            $project->clearMediaCollection('cover_image');
            $project->addMediaFromRequest('coverImage')->toMediaCollection('cover_image');
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $project->addMedia($image)->toMediaCollection('images');
            }
        }

        $tagIds = collect($request->validated('tags', []))->map(fn (string $name) => (Tag::where('name->bg', $name)->first()
            ?? Tag::create(['name' => ['bg' => $name, 'en' => $name]]))->id);

        $project->tags()->sync($tagIds->all());

        $project->specs()->delete();

        foreach ($request->validated('specs', []) as $i => $specData) {
            $project->specs()->create([
                'label' => $specData['label'],
                'value' => $specData['value'],
                'sort_order' => $i,
            ]);
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->specs()->delete();
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
