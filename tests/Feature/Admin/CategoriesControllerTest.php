<?php

use App\Enums\CategoryType;
use App\Models\Category;
use App\Models\Product;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects guests from index', function () {
    $this->get('/admin/categories')->assertRedirect('/login');
});

it('renders admin categories index with paginated categories', function () {
    Category::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get('/admin/categories')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/categories/index')
            ->has('categories.data', 3)
            ->has('categories.meta')
            ->has('filters')
            ->has('types', 2)
        );
});

it('filters categories by search term', function () {
    Category::factory()->create([
        'name' => ['bg' => 'Метални конструкции', 'en' => 'Metal Structures'],
        'type' => CategoryType::Project,
    ]);
    Category::factory()->create([
        'name' => ['bg' => 'Инструменти', 'en' => 'Tools'],
        'type' => CategoryType::Product,
    ]);

    $this->actingAs($this->user)
        ->get('/admin/categories?search=Метални&type=project')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('categories.data', 1)
            ->where('categories.data.0.name.bg', 'Метални конструкции')
            ->where('categories.data.0.type', 'project')
        );
});

it('filters categories by type', function () {
    Category::factory()->create(['type' => CategoryType::Project]);
    Category::factory()->create(['type' => CategoryType::Product]);

    $this->actingAs($this->user)
        ->get('/admin/categories?type=product')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('categories.data', 1)
            ->where('categories.data.0.type', 'product')
        );
});

it('creates a category and redirects to index', function () {
    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/categories')
        ->post('/admin/categories', [
            'name' => ['bg' => 'Нова категория', 'en' => 'New Category'],
            'type' => 'project',
        ])
        ->assertRedirect('/admin/categories')
        ->assertSessionHas('success', 'Category created.');

    $category = Category::where('name->bg', 'Нова категория')->first();

    expect($category)->not->toBeNull();
    expect($category->slug)->toBe('nova-kategoriia');
    expect($category->type)->toBe(CategoryType::Project);
});

it('validates category data on store', function (array $payload, array $errors) {
    $this->actingAs($this->user)
        ->post('/admin/categories', $payload)
        ->assertInvalid($errors);
})->with([
    'missing bulgarian name' => [
        ['name' => ['en' => 'Category'], 'type' => 'project'],
        ['name.bg'],
    ],
    'missing type' => [
        ['name' => ['bg' => 'Категория']],
        ['type'],
    ],
    'invalid type' => [
        ['name' => ['bg' => 'Категория'], 'type' => 'invalid'],
        ['type'],
    ],
]);

it('updates a category', function () {
    $category = Category::factory()->create([
        'name' => ['bg' => 'Стара категория', 'en' => 'Old Category'],
        'type' => CategoryType::Project,
    ]);

    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/categories')
        ->put("/admin/categories/{$category->slug}", [
            'name' => ['bg' => 'Обновена категория', 'en' => 'Updated Category'],
            'type' => 'product',
        ])
        ->assertRedirect('/admin/categories')
        ->assertSessionHas('success', 'Category updated.');

    expect($category->fresh()->getTranslation('name', 'bg'))->toBe('Обновена категория');
    expect($category->fresh()->type)->toBe(CategoryType::Product);
});

it('deletes a category with no relations', function () {
    $category = Category::factory()->create();

    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/categories')
        ->delete("/admin/categories/{$category->slug}")
        ->assertRedirect('/admin/categories')
        ->assertSessionHas('success', 'Category deleted.');

    expect(Category::find($category->id))->toBeNull();
});

it('prevents deleting a category that has related projects', function () {
    $category = Category::factory()->create(['type' => CategoryType::Project]);
    Project::factory()->create(['category_id' => $category->id]);

    $this->actingAs($this->user)
        ->delete("/admin/categories/{$category->slug}")
        ->assertConflict();

    expect($category->fresh())->not->toBeNull();
});

it('prevents deleting a category that has related products', function () {
    $category = Category::factory()->create(['type' => CategoryType::Product]);
    Product::factory()->create(['category_id' => $category->id]);

    $this->actingAs($this->user)
        ->delete("/admin/categories/{$category->slug}")
        ->assertConflict();

    expect($category->fresh())->not->toBeNull();
});
