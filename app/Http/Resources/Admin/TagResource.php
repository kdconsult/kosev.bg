<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
{
    /**
     * @return array{
     *     slug: string,
     *     name: array<string, string>,
     *     projects_count: int|null,
     *     products_count: int|null,
     * }
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->getTranslations('name'),
            'projects_count' => $this->whenCounted('projects'),
            'products_count' => $this->whenCounted('products'),
        ];
    }
}
