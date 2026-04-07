<?php

namespace App\Http\Resources\Admin;

use App\Enums\CategoryType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * @return array{
     *     slug: string,
     *     name: array<string, string>,
     *     type: string,
     *     type_label: string,
     *     projects_count: int|null,
     *     products_count: int|null,
     * }
     */
    public function toArray(Request $request): array
    {
        $type = $this->type instanceof CategoryType ? $this->type : CategoryType::from($this->type);

        return [
            'slug' => $this->slug,
            'name' => $this->getTranslations('name'),
            'type' => $type->value,
            'type_label' => $type->label(),
            'projects_count' => $this->whenCounted('projects'),
            'products_count' => $this->whenCounted('products'),
        ];
    }
}
