<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * @return array{
     *     slug: string,
     *     title: array<string, string>,
     *     description: array<string, string>,
     *     category_slug: string|null,
     *     tags: array<int, array{slug: string, name: string}>,
     *    specs: array<int, array{id: int, label: array<string, string>, value: array<string, string>, sort_order: int}>,
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
            'specs' => $this->whenLoaded('specs', fn () => $this->specs->map(fn ($spec) => [
                'id' => $spec->id,
                'label' => $spec->getTranslations('label'),
                'value' => $spec->getTranslations('value'),
                'sort_order' => $spec->sort_order,
            ])->values()->all()),
        ];
    }
}
