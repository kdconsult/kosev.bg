<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecResource extends JsonResource
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
            // same thing here, is this really needed? laravel/translatable handles this automatically.
            'label' => $this->getTranslation('label', $locale, false) ?: $this->getTranslation('label', 'bg'),
            'value' => $this->getTranslation('value', $locale, false) ?: $this->getTranslation('value', 'bg'),
        ];
    }
}
