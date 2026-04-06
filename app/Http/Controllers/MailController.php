<?php

namespace App\Http\Controllers;

use App\Http\Requests\MailRequest;
use App\Mail\ContactMessage;
use App\Mail\MessageReceived;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MailController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(MailRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $mailData = $validated;

        unset($mailData['g-recaptcha-response']);

        // Send email logic here, e.g. using Laravel's Mail facade
        Mail::to(config('mail.contact_address'))->cc(config('mail.contact_cc_address'))->send(new ContactMessage($mailData));
        Mail::to($validated['email'])->send(new MessageReceived($mailData));

        Inertia::flash('success', 'Your message has been sent successfully!');

        return back();
    }
}
