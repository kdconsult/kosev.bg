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
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'short_description' => $this->description ? str()->limit(strip_tags($this->description), 150) : null,
            'cover_image' => ['originalUrl' => $this->coverImage()?->getUrl() ?? 'https://placehold.co/800x600'],
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'specs' => SpecResource::collection($this->whenLoaded('specs')),
            'products' => ProductResource::collection($this->whenLoaded('products')),
        ];
    }
}
