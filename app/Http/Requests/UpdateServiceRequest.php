<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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

    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.bg.required' => 'The name in Bulgarian is required.',
            'description.bg.string' => 'The description in Bulgarian must be a string.',
            'description.en.string' => 'The description in English must be a string.',
            'cover_image.image' => 'The cover image must be an image file.',
            'cover_image.max' => 'The cover image must not exceed 2MB.',
            'products.*.string' => 'Each product must be a string.',
            'products.*.max' => 'Each product must not exceed 255 characters.',
            'tags.*.string' => 'Each tag must be a string.',
            'tags.*.max' => 'Each tag must not exceed 100 characters.',
            'specs.*.label.required' => 'Each spec must have a label.',
            'specs.*.label.bg.required' => 'Each spec label in Bulgarian is required.',
            'specs.*.label.en.required' => 'Each spec label in English is required.',
            'specs.*.value.required' => 'Each spec must have a value.',
            'specs.*.value.bg.required' => 'Each spec value in Bulgarian is required.',
            'specs.*.value.en.required' => 'Each spec value in English is required.',
        ];
    }
}
