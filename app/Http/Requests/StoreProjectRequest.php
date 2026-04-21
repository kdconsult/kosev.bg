<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'array'],
            'title.bg' => ['required', 'string', 'max:255'],
            'title.en' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'array'],
            'description.bg' => ['required', 'string'],
            'description.en' => ['nullable', 'string'],
            'category_id' => ['nullable', 'exists:categories,id'],
            'coverImage' => ['nullable', 'image', 'max:2048'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:2048'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:100'],
            'specs' => ['nullable', 'array'],
            'specs.*.label' => ['required', 'array'],
            'specs.*.label.bg' => ['required', 'string', 'max:255'],
            'specs.*.label.en' => ['nullable', 'string', 'max:255'],
            'specs.*.value' => ['required', 'array'],
            'specs.*.value.bg' => ['required', 'string', 'max:255'],
            'specs.*.value.en' => ['nullable', 'string', 'max:255'],
        ];
    }
}
