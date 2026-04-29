<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Product;
use App\Models\Project;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'products' => Product::count('id'),
                'projects' => Project::count('id'),
                'services' => Service::active()->count('id'),
                'certificates' => Certificate::active()->count('id'),
            ],
            'recentProducts' => Product::with(['category', 'media'])
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (Product $p) => [
                    'slug' => $p->slug,
                    'title' => $p->getTranslation('title', 'bg') ?: $p->getTranslation('title', 'en'),
                    'category' => $p->category?->getTranslation('name', 'bg') ?: $p->category?->getTranslation('name', 'en'),
                    'cover_url' => $p->getFirstMediaUrl('cover_image', 'thumb') ?: null,
                ]),
            'recentProjects' => Project::with(['category', 'media'])
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (Project $p) => [
                    'slug' => $p->slug,
                    'title' => $p->getTranslation('title', 'bg') ?: $p->getTranslation('title', 'en'),
                    'category' => $p->category?->getTranslation('name', 'bg') ?: $p->category?->getTranslation('name', 'en'),
                    'cover_url' => $p->getFirstMediaUrl('cover_image', 'thumb') ?: null,
                ]),
        ]);
    }
}
