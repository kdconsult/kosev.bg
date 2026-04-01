<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
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
            'industry' => ['nullable', 'array'],
            'industry.*' => ['nullable', 'string', 'max:255'],
            'category_slug' => ['nullable', 'exists:categories,slug'],
            'tag_slugs' => ['array'],
            'tag_slugs.*' => ['exists:tags,slug'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'title.bg.required' => 'The title in Bulgarian is required.',
            'title.en.required' => 'The title in English is required.',
            'description.required' => 'The description field is required.',
            'description.bg.required' => 'The description in Bulgarian is required.',
            'description.en.required' => 'The description in English is required.',
            'industry.*.max' => 'The industry in each language must not exceed 255 characters.',
            'category_slug.exists' => 'The selected category is invalid.',
            'tag_slugs.*.exists' => 'One or more selected tags are invalid.',
        ];
    }
}
