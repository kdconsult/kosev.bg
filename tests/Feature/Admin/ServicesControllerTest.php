<?php

use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
});

// --- Auth guard ---

it('redirects guests from index', function () {
    $this->get('/admin/services')->assertRedirect('/login');
});

it('redirects guests from create', function () {
    $this->get('/admin/services/create')->assertRedirect('/login');
});

it('redirects guests from edit', function () {
    $service = Service::factory()->create();
    $this->get("/admin/services/{$service->slug}/edit")->assertRedirect('/login');
});

// --- Index ---

it('renders admin services index with paginated services', function () {
    Service::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get('/admin/services')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/services/index')
            ->has('services.data', 3)
            ->has('services.meta')
            ->has('filters')
        );
});

it('filters services by search term', function () {
    Service::factory()->create(['name' => ['bg' => 'Заваряване', 'en' => 'Welding']]);
    Service::factory()->create(['name' => ['bg' => 'Лазерно рязане', 'en' => 'Laser Cutting']]);

    $this->actingAs($this->user)
        ->get('/admin/services?search=Заваряване')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('services.data', 1)
            ->where('services.data.0.name.bg', 'Заваряване')
        );
});

// --- Create ---

it('renders admin services create form', function () {
    $this->actingAs($this->user)
        ->get('/admin/services/create')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/services/create')
        );
});

// --- Store ---

it('creates a service and redirects to index', function () {
    $this->actingAs($this->user)
        ->post('/admin/services', [
            'name' => ['bg' => 'Ново заваряване', 'en' => 'New Welding'],
        ])
        ->assertRedirect('/admin/services');

    $service = Service::where('name->bg', 'Ново заваряване')->first();
    expect($service)->not->toBeNull();
    expect($service->slug)->toBe('novo-zavariavane');
});

it('validates name.bg is required on store', function () {
    $this->actingAs($this->user)
        ->post('/admin/services', ['name' => ['en' => 'Welding']])
        ->assertInvalid(['name.bg']);
});

// --- Show ---

it('redirects admin show to public services page', function () {
    $service = Service::factory()->create();

    $this->actingAs($this->user)
        ->get("/admin/services/{$service->slug}")
        ->assertRedirect(route('services.show', $service->slug));
});

// --- Edit ---

it('renders admin services edit form with service data', function () {
    $service = Service::factory()->create(['name' => ['bg' => 'Заваряване', 'en' => 'Welding']]);

    $this->actingAs($this->user)
        ->get("/admin/services/{$service->slug}/edit")
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/services/edit')
            ->has('service')
            ->where('service.slug', $service->slug)
            ->has('service.name.bg')
        );
});

// --- Update ---

it('updates a service and redirects to index', function () {
    $service = Service::factory()->create(['name' => ['bg' => 'Заваряване', 'en' => 'Welding']]);

    $this->actingAs($this->user)
        ->put("/admin/services/{$service->slug}", [
            'name' => ['bg' => 'Обновено заваряване', 'en' => 'Updated Welding'],
        ])
        ->assertRedirect('/admin/services');

    expect($service->fresh()->getTranslation('name', 'bg'))->toBe('Обновено заваряване');
});

// --- Destroy ---

it('deletes a service and redirects to index', function () {
    $service = Service::factory()->create();

    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/services')
        ->delete("/admin/services/{$service->slug}")
        ->assertRedirect('/admin/services');

    expect(Service::find($service->id))->toBeNull();
});

it('detaches products when deleting a service', function () {
    $service = Service::factory()->create();
    $product = Product::factory()->create();
    $product->services()->attach($service->id);

    $this->actingAs($this->user)
        ->withHeader('Referer', '/admin/services')
        ->delete("/admin/services/{$service->slug}")
        ->assertRedirect('/admin/services');

    expect(Service::find($service->id))->toBeNull();
    expect($product->fresh()->services)->toHaveCount(0);
});
