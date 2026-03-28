<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'industry' => $this->getTranslation('industry', $locale, false) ?: $this->getTranslation('industry', 'bg'),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'cover_image' => new ImageResource($this->whenLoaded('coverImage')),
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'specs' => SpecResource::collection($this->whenLoaded('specs')),
        ];
    }
}
