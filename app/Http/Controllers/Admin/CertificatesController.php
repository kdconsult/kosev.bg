<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = CertificateResource::collection(Certificate::orderBy('active')->orderBySort()->get());

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
        $certificate = Certificate::create($request->safe()->only(['name', 'description', 'active']));

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
    public function edit(Request $request, Certificate $certificate)
    {
        return Inertia::render('admin/certificates/edit', [
            'certificate' => $certificate,
            'imagePath' => $certificate->getFirstMediaUrl('pdfs', 'thumb') ?: 'https://placehold.co/600x400',
            'locales' => config('app.locales'),
            'from' => $request->query('from'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
        $certificate->update($request->safe()->only(['name', 'description', 'active']));

        if ($request->hasFile('pdf')) {
            $certificate
                ->addMediaFromRequest('pdf')
                ->toMediaCollection('pdfs');
        }

        $from = $request->query('from');

        return redirect($from && str_starts_with($from, '/') ? $from : route('admin.certificates.index'))
            ->with('success', 'Certificate updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        $certificate->delete();

        return redirect()->back()->with('success', 'Certificate deleted successfully.');
    }
}
