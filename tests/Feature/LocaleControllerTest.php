<?php

it('sets locale cookie on valid locale', function (string $locale) {
    $response = $this->post("/locale/{$locale}");

    $response->assertRedirect();

    $cookie = collect($response->headers->getCookies())
        ->first(fn ($c) => $c->getName() === 'locale');

    expect($cookie)->not->toBeNull()
        ->and($cookie->getValue())->toBe($locale);
})->with(['bg', 'en']);

it('returns 404 for unsupported locale', function () {
    $this->post('/locale/fr')->assertNotFound();
});

it('does not set locale cookie for subsequent get requests', function () {
    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page->where('locale', 'bg'));
});
