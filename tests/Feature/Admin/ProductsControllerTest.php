<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\Service;
use App\Models\Spec;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
    Storage::fake('media');
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Нов продукт', 'en' => 'New Product'],
            'description' => ['bg' => 'Описание на продукта', 'en' => 'Product description'],
            'category_slug' => $category->slug,
            'coverImage' => UploadedFile::fake()->image('cover.jpg'),
        ])
        ->assertRedirect('/admin/products');

    expect(Product::where('title->bg', 'Нов продукт')->first())->not->toBeNull();
});

it('creates tags when storing a product', function () {
    Storage::fake('media');
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Продукт с тагове', 'en' => 'Tagged Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'tags' => ['Хидравлика', 'Помпи'],
            'coverImage' => UploadedFile::fake()->image('cover.jpg'),
        ])
        ->assertRedirect('/admin/products');

    $product = Product::where('title->bg', 'Продукт с тагове')->first();

    expect($product->tags)->toHaveCount(2);
    expect(Tag::all())->toHaveCount(2);
});

it('reuses existing tags when storing a product', function () {
    Storage::fake('media');
    $existingTag = Tag::factory()->create(['name' => ['bg' => 'Хидравлика', 'en' => 'Hydraulics']]);
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'tags' => ['Хидравлика'],
            'coverImage' => UploadedFile::fake()->image('cover.jpg'),
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

// --- Services ---

it('syncs services when storing a product', function () {
    Storage::fake('media');
    $category = Category::factory()->create(['type' => 'product']);
    $service = Service::factory()->create(['name' => ['bg' => 'Заваряване', 'en' => 'Welding']]);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'coverImage' => UploadedFile::fake()->image('cover.jpg'),
            'services' => ['Заваряване'],
        ])
        ->assertRedirect('/admin/products');

    $product = Product::where('title->bg', 'Продукт')->first();

    expect($product->services)->toHaveCount(1);
    expect($product->services->first()->id)->toBe($service->id);
});

it('syncs services on update', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);
    $oldService = Service::factory()->create(['name' => ['bg' => 'Стара', 'en' => 'Old']]);
    $newService = Service::factory()->create(['name' => ['bg' => 'Нова', 'en' => 'New']]);
    $product->services()->attach($oldService->id);

    $this->actingAs($this->user)
        ->put("/admin/products/{$product->slug}", [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'services' => ['Нова'],
        ])
        ->assertRedirect('/admin/products');

    expect($product->fresh()->services)->toHaveCount(1);
    expect($product->fresh()->services->first()->id)->toBe($newService->id);
});

it('create page includes availableServces', function () {
    Service::factory()->create(['name' => ['bg' => 'Заваряване', 'en' => 'Welding']]);
    Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->get('/admin/products/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/products/create')
            ->has('availableServces', 1)
        );
});

// --- Specs ---

it('creates specs when storing a product', function () {
    Storage::fake('media');
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'coverImage' => UploadedFile::fake()->image('cover.jpg'),
            'specs' => [
                ['label' => ['bg' => 'Тегло', 'en' => 'Weight'], 'value' => ['bg' => '10 кг', 'en' => '10 kg']],
                ['label' => ['bg' => 'Цвят', 'en' => 'Color'], 'value' => ['bg' => 'Червен', 'en' => 'Red']],
            ],
        ])
        ->assertRedirect('/admin/products');

    $product = Product::where('title->bg', 'Продукт')->first();

    expect($product->specs)->toHaveCount(2);
    expect($product->specs->first()->getTranslation('label', 'bg'))->toBe('Тегло');
    expect($product->specs->first()->sort_order)->toBe(0);
    expect($product->specs->last()->sort_order)->toBe(1);
});

it('syncs specs on update', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);
    $product->specs()->create(['label' => ['bg' => 'Стар', 'en' => 'Old'], 'value' => ['bg' => 'Стойност', 'en' => 'Value'], 'sort_order' => 0]);

    $this->actingAs($this->user)
        ->put("/admin/products/{$product->slug}", [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'specs' => [
                ['label' => ['bg' => 'Нова', 'en' => 'New'], 'value' => ['bg' => 'Нова стойност', 'en' => 'New Value']],
            ],
        ])
        ->assertRedirect('/admin/products');

    expect($product->fresh()->specs)->toHaveCount(1);
    expect($product->fresh()->specs->first()->getTranslation('label', 'bg'))->toBe('Нова');
    expect(Spec::where('label->bg', 'Стар')->first())->toBeNull();
});

it('removes all specs on update when none submitted', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);
    $product->specs()->create(['label' => ['bg' => 'Тест', 'en' => 'Test'], 'value' => ['bg' => 'Стойност', 'en' => 'Value'], 'sort_order' => 0]);

    $this->actingAs($this->user)
        ->put("/admin/products/{$product->slug}", [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
        ])
        ->assertRedirect('/admin/products');

    expect($product->fresh()->specs)->toHaveCount(0);
});

it('validates spec label.bg is required', function () {
    $category = Category::factory()->create(['type' => 'product']);

    $this->actingAs($this->user)
        ->post('/admin/products', [
            'title' => ['bg' => 'Продукт', 'en' => 'Product'],
            'description' => ['bg' => 'Описание', 'en' => 'Description'],
            'category_slug' => $category->slug,
            'specs' => [
                ['label' => ['en' => 'Weight'], 'value' => ['bg' => '10 кг', 'en' => '10 kg']],
            ],
        ])
        ->assertInvalid(['specs.0.label.bg']);
});

it('edit page includes specs in product data', function () {
    $category = Category::factory()->create(['type' => 'product']);
    $product = Product::factory()->create(['category_id' => $category->id]);
    $product->specs()->create(['label' => ['bg' => 'Тегло', 'en' => 'Weight'], 'value' => ['bg' => '5 кг', 'en' => '5 kg'], 'sort_order' => 0]);

    $this->actingAs($this->user)
        ->get("/admin/products/{$product->slug}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/products/edit')
            ->has('product.specs', 1)
            ->where('product.specs.0.label.bg', 'Тегло')
            ->where('product.specs.0.value.bg', '5 кг')
        );
});

it('deletes specs when destroying a product', function () {
    $product = Product::factory()->create();
    $product->specs()->create(['label' => ['bg' => 'Тегло', 'en' => 'Weight'], 'value' => ['bg' => '5 кг', 'en' => '5 kg'], 'sort_order' => 0]);

    $this->actingAs($this->user)
        ->delete("/admin/products/{$product->slug}")
        ->assertRedirect('/admin/products');

    expect(Spec::where('specable_type', Product::class)->where('specable_id', $product->id)->first())->toBeNull();
});

// --- Destroy ---

it('deletes a product and redirects to index', function () {
    $product = Product::factory()->create();

    $this->actingAs($this->user)
        ->delete("/admin/products/{$product->slug}")
        ->assertRedirect('/admin/products');

    expect(Product::find($product->id))->toBeNull();
});
