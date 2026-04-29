<?php

use App\Models\Product;
use App\Models\Project;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects guests from index', function () {
    $this->get('/admin/tags')->assertRedirect('/login');
});

it('renders admin tags index with paginated tags', function () {
    Tag::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get('/admin/tags')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/tags/index')
            ->has('tags.data', 3)
            ->has('tags.meta')
            ->has('filters')
        );
});

it('filters tags by search term', function () {
    Tag::factory()->create(['name' => ['bg' => 'Метал', 'en' => 'Metal']]);
    Tag::factory()->create(['name' => ['bg' => 'Дърво', 'en' => 'Wood']]);

    $this->actingAs($this->user)
        ->get('/admin/tags?search=Метал')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('tags.data', 1)
            ->where('tags.data.0.name.bg', 'Метал')
        );
});

it('creates a tag and redirects to index', function () {
    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/tags')
        ->post('/admin/tags', [
            'name' => ['bg' => 'Нов таг', 'en' => 'New Tag'],
        ])
        ->assertRedirect('/admin/tags')
        ->assertSessionHas('success', 'Tag created.');

    $tag = Tag::where('name->bg', 'Нов таг')->first();

    expect($tag)->not->toBeNull();
    expect($tag->slug)->toBe('nov-tag');
    expect($tag->getTranslation('name', 'en'))->toBe('New Tag');
});

it('validates tag data on store', function (array $payload, array $errors) {
    $this->actingAs($this->user)
        ->post('/admin/tags', $payload)
        ->assertInvalid($errors);
})->with([
    'missing bulgarian name' => [
        ['name' => ['en' => 'Tag']],
        ['name.bg'],
    ],
    'missing name array' => [
        [],
        ['name'],
    ],
]);

it('updates a tag', function () {
    $tag = Tag::factory()->create(['name' => ['bg' => 'Стар таг', 'en' => 'Old Tag']]);

    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/tags')
        ->put("/admin/tags/{$tag->slug}", [
            'name' => ['bg' => 'Обновен таг', 'en' => 'Updated Tag'],
        ])
        ->assertRedirect('/admin/tags')
        ->assertSessionHas('success', 'Tag updated.');

    expect($tag->fresh()->getTranslation('name', 'bg'))->toBe('Обновен таг');
    expect($tag->fresh()->getTranslation('name', 'en'))->toBe('Updated Tag');
});

it('deletes a tag with no relations', function () {
    $tag = Tag::factory()->create();

    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/tags')
        ->delete("/admin/tags/{$tag->slug}")
        ->assertRedirect('/admin/tags')
        ->assertSessionHas('success', 'Tag deleted.');

    expect(Tag::find($tag->id))->toBeNull();
});

it('prevents deleting a tag used by a product', function () {
    $tag = Tag::factory()->create();
    $product = Product::factory()->create();
    $product->tags()->attach($tag->id);

    $this->actingAs($this->user)
        ->delete("/admin/tags/{$tag->slug}")
        ->assertConflict();

    expect($tag->fresh())->not->toBeNull();
});

it('prevents deleting a tag used by a project', function () {
    $tag = Tag::factory()->create();
    $project = Project::factory()->create();
    $project->tags()->attach($tag->id);

    $this->actingAs($this->user)
        ->delete("/admin/tags/{$tag->slug}")
        ->assertConflict();

    expect($tag->fresh())->not->toBeNull();
});
