<?php

namespace App\Http\Controllers;

use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('certificates', [
            'certificates' => CertificateResource::collection(
                Certificate::orderBy('sort_order')->get()
            ),
        ]);
    }

    public function show(Certificate $certificate)
    {
        $media = $certificate->getFirstMedia('pdfs');

        return $media;
    }
}
