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
            'translations' => __('certificates'),
            'certificates' => CertificateResource::collection(
                Certificate::active()->orderBySort()->get()
            ),
        ]);
    }

    public function show(Certificate $certificate)
    {
        $media = $certificate->getFirstMedia('pdfs');

        return $media;
    }
}
