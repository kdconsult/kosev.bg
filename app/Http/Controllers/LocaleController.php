<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;

class LocaleController extends Controller
{
    public function __invoke(string $locale): RedirectResponse
    {
        $locales = config('app.locales', ['bg', 'en']);

        if (! in_array($locale, $locales, true)) {
            abort(404);
        }

        return redirect()->back()->withCookie(
            cookie()->forever('locale', $locale)
        );
    }
}
