<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            'name' => ['required', 'array'],
            'name.bg' => ['required', 'string', 'max:255'],
            'name.en' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'array'],
            'description.bg' => ['nullable', 'string'],
            'description.en' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'cover_image' => ['nullable', 'image', 'max:2048'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:5120'],
            'products' => ['nullable', 'array'],
            'products.*' => ['string', 'max:255'],
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
