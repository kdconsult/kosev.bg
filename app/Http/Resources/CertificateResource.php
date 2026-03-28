<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            'slug' => $this->slug,
            'name' => $this->getTranslation('name', $locale, false) ?: $this->getTranslation('name', 'bg'),
            'description' => $this->getTranslation('description', $locale, false) ?: $this->getTranslation('description', 'bg'),
            'image_path' => $this->image_path,
            'pdf_path' => $this->pdf_path,
        ];
    }
}
