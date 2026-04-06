<?php

use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;

uses(RefreshDatabase::class);

test('public pages share seo metadata props', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->where('appUrl', config('app.url'))
            ->where('locale', app()->getLocale())
            ->where('seo.home.title', trans('seo.home.title'))
            ->where('seo.home.description', trans('seo.home.description'))
        );
});

test('service detail page returns a public inertia response', function () {
    $service = Service::factory()->create();

    $this->get(route('services.show', $service))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('services/show')
            ->where('service.slug', $service->slug)
            ->has('service.specs')
            ->has('service.tags')
        );
});

test('sitemap generation command writes static and dynamic public urls', function () {
    $product = Product::factory()->create();
    $project = Project::factory()->create();
    $service = Service::factory()->create();

    File::delete(public_path('sitemap.xml'));

    $this->artisan('sitemap:generate')
        ->assertExitCode(0);

    expect(public_path('sitemap.xml'))->toBeFile();

    $content = File::get(public_path('sitemap.xml'));

    expect($content)
        ->toContain(route('home'))
        ->toContain(route('about'))
        ->toContain(route('contacts'))
        ->toContain(route('products.show', $product))
        ->toContain(route('projects.show', $project))
        ->toContain(route('services.show', $service));
});
