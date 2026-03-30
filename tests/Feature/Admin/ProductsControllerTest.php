<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

// --- Auth guard ---

it('redirects guests from index', function () {
    $this->get('/admin/products')->assertRedirect('/login');
});

it('redirects guests from create', function () {
    $this->get('/admin/products/create')->assertRedirect('/login');
});

it('redirects guests from edit', function () {
    $product = Product::factory()->create();
    $this->get("/admin/products/{$product->slug}/edit")->assertRedirect('/login');
});

// --- Index ---

it('renders admin products index with paginated products', function () {
    $category = Category::factory()->create(['type' => 'product']);
    Product::factory()->count(3)->create(['category_id' => $category->id]);

    $this->actingAs($this->user)
        ->get('/admin/products')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/products/index')
            ->has('products.data', 3)
            ->has('products.meta')
            ->has('filters')
        );
});

it('filters products by search term', function () {
    $category = Category::factory()->create(['type' => 'product']);
    Product::factory()->create(['category_id' => $category->id, 'title' => ['bg' => 'Хидравлична помпа', 'en' => 'Hydraulic Pump']]);
    Product::factory()->create(['category_id' => $category->id, 'title' => ['bg' => 'Друг продукт', 'en' => 'Other Product']]);

    $this->actingAs($this->user)
        ->get('/admin/products?search=Хидравлична')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('products.data', 1)
            ->where('products.data.0.title.bg', 'Хидравлична помпа')
        );
});

// --- Create ---

it('renders admin products create form', function () {
    Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->get('/admin/products/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/products/create')
            ->has('categories')
            ->has('availableTags')
        );
});

// --- Store ---

it('creates a product and redirects to index', function () {
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Нов продукт', 'en' => 'New Product'],
            'description' => ['bg' => 'Описание на продукта', 'en' => 'Product description'],
            'category_slug' => $category->slug,
        ])
        ->assertRedirect('/admin/products');

    expect(Product::where('title->bg', 'Нов продукт')->first())->not->toBeNull();
});

it('creates tags when storing a product', function () {
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Продукт с тагове', 'en' => 'Tagged Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'tags' => ['Хидравлика', 'Помпи'],
        ])
        ->assertRedirect('/admin/products');

    $product = Product::where('title->bg', 'Продукт с тагове')->first();

    expect($product->tags)->toHaveCount(2);
    expect(Tag::all())->toHaveCount(2);
});

it('reuses existing tags when storing a product', function () {
    $existingTag = Tag::factory()->create(['name' => ['bg' => 'Хидравлика', 'en' => 'Hydraulics']]);
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'tags' => ['Хидравлика'],
        ])
        ->assertRedirect('/admin/products');

    expect(Tag::count())->toBe(1);
    expect($existingTag->fresh()->products)->toHaveCount(1);
});

it('validates required fields on store', function (array $data, string $field) {
    $this->actingAs($this->user)
        ->post('/admin/products', $data)
        ->assertInvalid([$field]);
})->with([
    'missing title bg' => [
        ['title' => ['en' => 'Name'], 'description' => ['bg' => 'Desc', 'en' => 'Desc'], 'category_slug' => 'cat'],
        'title.bg',
    ],
    'missing description bg' => [
        ['title' => ['bg' => 'Заглавие', 'en' => 'Title'], 'description' => ['en' => 'Desc'], 'category_slug' => 'cat'],
        'description.bg',
    ],
    'invalid category slug' => [
        ['title' => ['bg' => 'Заглавие', 'en' => 'Title'], 'description' => ['bg' => 'Desc', 'en' => 'Desc'], 'category_slug' => 'nonexistent'],
        'category_slug',
    ],
]);

// --- Show (redirect) ---

it('redirects admin show to public product page', function () {
    $product = Product::factory()->create();

    $this->actingAs($this->user)
        ->get("/admin/products/{$product->slug}")
        ->assertRedirect(route('products.show', $product));
});

// --- Edit ---

it('renders admin products edit form with product data', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);
    $tag = Tag::factory()->create();
    $product->tags()->attach($tag->id);

    $this->actingAs($this->user)
        ->get("/admin/products/{$product->slug}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/products/edit')
            ->has('product')
            ->where('product.slug', $product->slug)
            ->has('product.title.bg')
            ->has('product.tags', 1)
            ->has('categories')
            ->has('availableTags')
        );
});

// --- Update ---

it('updates a product and redirects to index', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $newCategory = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);

    $this->actingAs($this->user)
        ->put("/admin/products/{$product->slug}", [
            'title' => ['bg' => 'Обновено заглавие', 'en' => 'Updated Title'],
            'description' => ['bg' => 'Ново описание', 'en' => 'New description'],
            'category_slug' => $newCategory->slug,
        ])
        ->assertRedirect('/admin/products');

    expect($product->fresh()->getTranslation('title', 'bg'))->toBe('Обновено заглавие');
    expect($product->fresh()->category_id)->toBe($newCategory->id);
});

it('syncs tags on update', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);
    $oldTag = Tag::factory()->create(['name' => ['bg' => 'Стар', 'en' => 'Old']]);
    $product->tags()->attach($oldTag->id);

    $this->actingAs($this->user)
        ->put("/admin/products/{$product->slug}", [
            'title' => ['bg' => 'Заглавие', 'en' => 'Title'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'tags' => ['Нов'],
        ])
        ->assertRedirect('/admin/products');

    expect($product->fresh()->tags)->toHaveCount(1);
    expect($product->fresh()->tags->first()->getTranslation('name', 'bg'))->toBe('Нов');
});

// --- Destroy ---

it('deletes a product and redirects to index', function () {
    $product = Product::factory()->create();

    $this->actingAs($this->user)
        ->delete("/admin/products/{$product->slug}")
        ->assertRedirect('/admin/products');

    expect(Product::find($product->id))->toBeNull();
});
