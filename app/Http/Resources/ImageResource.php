<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
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
            'id' => $this->id,
            'path' => $this->path,
            'alt' => $this->alt ? ($this->getTranslation('alt', $locale, false) ?: $this->getTranslation('alt', 'bg')) : null,
            'is_cover' => $this->is_cover,
        ];
    }
}
