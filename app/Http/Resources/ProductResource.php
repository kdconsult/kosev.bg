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
        $description = $this->getTranslation('description', $locale, false) ?: $this->getTranslation('description', 'bg');

        return [
            'slug' => $this->slug,
            'title' => $this->getTranslation('title', $locale, false) ?: $this->getTranslation('title', 'bg'),
            'short_description' => $description ? str()->limit(strip_tags($description), 150) : null,
            'description' => $description,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'cover_image' => $this->coverImage() ? ['id' => $this->coverImage()->id, 'thumbUrl' => $this->coverImage()->getUrl('thumb'), 'originalUrl' => $this->coverImage()->getUrl()] : ['id' => null, 'thumbUrl' => 'https://placehold.co/600x400', 'originalUrl' => null],
            'images' => $this->images() ? $this->images()->map(fn ($image) => ['id' => $image->id, 'thumbUrl' => $image->getUrl('thumb'), 'originalUrl' => $image->getUrl()]) : null,
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'specs' => SpecResource::collection($this->whenLoaded('specs')),
            'services' => ServiceResource::collection($this->whenLoaded('services')),
        ];
    }
}
