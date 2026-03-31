<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        $media = $this->getFirstMedia('pdfs');

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale) ?? $this->getTranslation('name', config('app.fallback_locale')),
            'description' => $this->getTranslation('description', $locale) ?? $this->getTranslation('description', config('app.fallback_locale')),
            'imagePath' => $media ? $media->getUrl('thumb') : 'https://placehold.co/600x400',
            'pdfPath' => $media ? $media->getUrl() : 'https://placehold.co/600x400',
        ];
    }
}
