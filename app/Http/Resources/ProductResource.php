<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            // same
            'title' => $this->getTranslation('title', $locale, false) ?: $this->getTranslation('title', 'bg'),
            'description' => $this->getTranslation('description', $locale, false) ?: $this->getTranslation('description', 'bg'),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'cover_image' => new ImageResource($this->whenLoaded('coverImage')),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'specs' => SpecResource::collection($this->whenLoaded('specs')),
            'services' => ServiceResource::collection($this->whenLoaded('services')),
        ];
    }
}
