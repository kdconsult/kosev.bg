<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * @return array{
     *     slug: string,
     *     title: array<string, string>,
     *     description: array<string, string>,
     *     category_slug: string|null,
     *     tags: array<int, array{slug: string, name: string}>,
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->getTranslations('title'),
            'description' => $this->getTranslations('description'),
            'category_slug' => $this->whenLoaded('category', fn () => $this->category?->slug),
            'tags' => $this->whenLoaded('tags', fn () => $this->tags->map(fn ($tag) => [
                'slug' => $tag->slug,
                'name' => $tag->getTranslation('name', 'bg') ?: $tag->getTranslation('name', 'en'),
            ])->values()->all()),
        ];
    }
}
