<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\Admin\ProjectResource as AdminProjectResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TagResource;
use App\Models\Category;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/projects/create', [
            'categories' => CategoryResource::collection(Category::where('type', 'project')->get()),
            'tags' => TagResource::collection(Tag::where('type', 'project')->get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->validated());

        if ($request->hasFile('coverImage')) {
            $project->addMediaFromRequest('coverImage')->toMediaCollection('cover_image');
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $project->addMedia($image)->toMediaCollection('images');
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $coverImage = $project->coverImage();

        return Inertia::render('admin/projects/edit', [
            'project' => new AdminProjectResource($project->load(['category', 'tags', 'specs'])),
            'categories' => CategoryResource::collection(Category::where('type', 'project')->get()),
            'tags' => TagResource::collection(Tag::where('type', 'project')->get()),
            'coverImageUrl' => $coverImage?->getUrl(),
            'coverImageAlt' => $coverImage?->getCustomProperty('alt'),
            'images' => $project->images()->map(fn ($image) => ['id' => $image->id, 'thumbUrl' => $image->getUrl('thumb')]),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        if ($request->hasFile('coverImage')) {
            $project->clearMediaCollection('cover_image');
            $project->addMediaFromRequest('coverImage')->toMediaCollection('cover_image');
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $project->addMedia($image)->toMediaCollection('images');
            }
        }

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
