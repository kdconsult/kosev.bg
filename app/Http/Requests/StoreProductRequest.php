<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'category_slug' => ['required', 'string', 'exists:categories,slug'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:100'],
        ];
    }
}
