<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Service;
use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('products index returns 200 with products and categories props', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);

    $response = $this->get(route('products.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('products/index')
        ->has('products', 1)
        ->has('categories', 1)
        ->has('products.0.slug')
        ->has('products.0.title')
        ->has('products.0.category')
    );
});

test('products index filters are built from product categories only', function () {
    Category::factory()->create(['type' => 'product']);
    Category::factory()->create(['type' => 'project']);

    $response = $this->get(route('products.index'));

    $response->assertInertia(fn ($page) => $page
        ->has('categories', 1)
    );
});

test('products show returns 200 with product prop including services and tags', function () {
    $product = Product::factory()->create();
    $tag = Tag::factory()->create();
    $service = Service::factory()->create();
    $product->tags()->attach($tag->id);
    $product->services()->attach($service->id);

    $response = $this->get(route('products.show', $product->slug));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('products/show')
        ->has('product')
        ->where('product.slug', $product->slug)
        ->has('product.images')
        ->has('product.tags')
        ->has('product.specs')
        ->has('product.services')
    );
});

test('products show returns 404 for unknown slug', function () {
    $this->get(route('products.show', 'non-existent-slug'))
        ->assertNotFound();
});
