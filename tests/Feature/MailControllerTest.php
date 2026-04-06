<?php

use Illuminate\Support\Facades\Mail;

it('redirects back with validation errors for invalid contact submissions', function () {
    Mail::fake();

    $response = $this->from(route('contacts'))->post(route('contact.send'), [
        'name' => '',
        'email' => 'not-an-email',
        'company' => 'Acme',
        'phone' => '0888123456',
        'message' => '',
    ]);

    $response->assertRedirect(route('contacts'))
        ->assertSessionHasErrors(['name', 'email', 'message', 'g-recaptcha-response']);

    Mail::assertNothingSent();
});
