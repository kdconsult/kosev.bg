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
            'services' => ServiceResource::collection(Service::active()->get()),
            'translations' => __('services.index'),
        ]);
    }

    public function show(Service $service): Response
    {
        return Inertia::render('services/show', [
            'service' => new ServiceResource(
                $service->load(['tags', 'specs', 'products'])
            ),
            'translations' => __('services.show'),
        ]);
    }
}
