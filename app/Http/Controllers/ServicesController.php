<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('services', [
            'services' => ServiceResource::collection(Service::with('tags', 'specs')->active()->get()),
        ]);
    }

    public function show(Service $service): RedirectResponse
    {
        return redirect()->to(route('services.index').'#'.$service->slug);
    }
}
