<?php

use App\Models\Category;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('projects index returns 200 with projects and categories props', function () {
    $category = Category::factory()->create(['type' => 'project']);
    $project = Project::factory()->create(['category_id' => $category->id]);

    $response = $this->get(route('projects.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('projects/index')
        ->has('projects', 1)
        ->has('categories', 1)
        ->has('projects.0.slug')
        ->has('projects.0.title')
        ->has('projects.0.category')
    );
});

test('projects index filters are built from project categories only', function () {
    Category::factory()->create(['type' => 'project']);
    Category::factory()->create(['type' => 'product']);

    $response = $this->get(route('projects.index'));

    $response->assertInertia(fn ($page) => $page
        ->has('categories', 1)
    );
});

test('projects show returns 200 with project prop', function () {
    $project = Project::factory()->create();
    $tag = Tag::factory()->create();
    $project->tags()->attach($tag->id);

    $response = $this->get(route('projects.show', $project->slug));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('projects/show')
        ->has('project')
        ->where('project.slug', $project->slug)
        ->has('project.images')
        ->has('project.tags')
        ->has('project.specs')
    );
});

test('projects show returns 404 for unknown slug', function () {
    $this->get(route('projects.show', 'non-existent-slug'))
        ->assertNotFound();
});
