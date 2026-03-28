<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProjectResource;
use App\Models\Category;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('projects/index', [
            'projects' => ProjectResource::collection(
                Project::with(['category', 'coverImage', 'tags'])->get()
            ),
            'categories' => CategoryResource::collection(
                Category::forProjects()->get()
            ),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

     /**
     * Display the specified resource.
     */
    public function show(Project $project): Response
    {
        return Inertia::render('projects/show', [
            'project' => new ProjectResource(
                $project->load(['category', 'images', 'tags', 'specs'])
            ),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
