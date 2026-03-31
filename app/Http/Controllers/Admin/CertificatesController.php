<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\Admin\CertificateResource;
use App\Models\Certificate;
use Inertia\Inertia;

class CertificatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = CertificateResource::collection(Certificate::orderBySort()->get());

        return Inertia::render('admin/certificates/index', [
            'certificates' => $certificates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/certificates/create', [
            'locales' => config('app.locales'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request)
    {
        $certificate = Certificate::create($request->validated());

        if ($request->hasFile('pdf')) {
            $certificate
                ->addMediaFromRequest('pdf')
                ->toMediaCollection('pdfs');
        }

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificate $certificate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificate $certificate)
    {
        return Inertia::render('admin/certificates/edit', [
            'certificate' => $certificate,
            'imagePath' => $certificate->getFirstMediaUrl('pdfs', 'thumb') ?: 'https://placehold.co/600x400',
            'locales' => config('app.locales'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
        $certificate->update($request->validated());

        if ($request->hasFile('pdf')) {
            $certificate
                ->addMediaFromRequest('pdf')
                ->toMediaCollection('pdfs');
        }

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return redirect()->route('admin.certificates.index')->with('success', 'Certificate deleted successfully.');
    }
}
