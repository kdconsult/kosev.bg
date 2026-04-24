<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('services/index', [
            'services' => ServiceResource::collection(Service::with('tags', 'specs')->active()->get()),
        ]);
    }

    public function show(Service $service): Response
    {
        return Inertia::render('services/show', [
            'service' => new ServiceResource(
                $service->load(['tags', 'specs', 'products'])
            ),
        ]);
    }
}
