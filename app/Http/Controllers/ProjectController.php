<?php

namespace App\Http\Controllers;

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
}
