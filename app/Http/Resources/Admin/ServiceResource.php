<?php

namespace App\Http\Resources\Admin;

use App\Http\Resources\SpecResource;
use App\Http\Resources\TagResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    /**
     *  @return array{
     *      slug: string,
     *      name: array<string, string>,
     *      description: array<string, string>,
     *      cover_image: string|null,
     *      products: array<int, ProductResource>,
     *      tags: array<int, TagResource>,
     *      specs: array<int, SpecResource>,
     *  }
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->getTranslations('name'),
            'description' => $this->getTranslations('description'),
            'cover_image' => $this->coverImage()?->getUrl() ?? 'https://placehold.co/800x600',
            'is_active' => $this->is_active ?? true,
            'products' => ProductResource::collection($this->whenLoaded('products')),
            'tags' => $this->whenLoaded('tags', fn () => $this->tags->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values()->all()),
            'specs' => $this->whenLoaded('specs', fn () => $this->specs->map(fn ($spec) => [
                'id' => $spec->id,
                'label' => $spec->getTranslations('label'),
                'value' => $spec->getTranslations('value'),
                'sort_order' => $spec->sort_order,
            ])->values()->all()),
        ];
    }
}
