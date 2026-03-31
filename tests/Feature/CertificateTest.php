<?php

use App\Models\Certificate;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('certificates index returns 200 with certificates prop', function () {
    Certificate::factory()->count(3)->create();

    $response = $this->get(route('certificates.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('certificates')
        ->has('certificates', 3)
        ->has('certificates.0.slug')
        ->has('certificates.0.name')
        ->has('certificates.0.description')
    );
});

test('certificates are ordered by sort_order', function () {
    Certificate::factory()->create(['sort_order' => 2, 'name' => ['bg' => 'С', 'en' => 'C']]);
    Certificate::factory()->create(['sort_order' => 0, 'name' => ['bg' => 'А', 'en' => 'A']]);
    Certificate::factory()->create(['sort_order' => 1, 'name' => ['bg' => 'Б', 'en' => 'B']]);

    $response = $this->get(route('certificates.index'));

    $response->assertInertia(fn ($page) => $page
        ->has('certificates', 3)
        ->where('certificates.0.name', 'А')
        ->where('certificates.1.name', 'Б')
        ->where('certificates.2.name', 'С')
    );
});
