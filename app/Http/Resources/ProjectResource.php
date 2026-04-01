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
            'title' => $this->getTranslation('title', $locale, false) ?: $this->getTranslation('title', config('app.fallback_locale')),
            'description' => $this->getTranslation('description', $locale, false) ?: $this->getTranslation('description', config('app.fallback_locale')),
            'industry' => $this->getTranslation('industry', $locale, false) ?: $this->getTranslation('industry', config('app.fallback_locale')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'cover_image' => $this->coverImage() ? ['id' => $this->coverImage()->id, 'thumbUrl' => $this->coverImage()->getUrl('thumb'), 'originalUrl' => $this->coverImage()->getUrl()] : ['id' => null, 'thumbUrl' => 'https://placehold.co/600x400', 'originalUrl' => 'https://placehold.co/600x400'],
            'images' => $this->images() ? $this->images()->map(fn ($image) => ['id' => $image->id, 'thumbUrl' => $image->getUrl('thumb'), 'originalUrl' => $image->getUrl()]) : null,
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'specs' => SpecResource::collection($this->whenLoaded('specs')),
        ];
    }
}
