<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
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
            // is this really needed? laravel/translatable handles this automatically.
            'name' => $this->getTranslation('name', $locale, false) ?: $this->getTranslation('name', 'bg'),
        ];
    }
}
