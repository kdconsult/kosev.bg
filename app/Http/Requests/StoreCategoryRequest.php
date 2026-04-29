<?php

namespace App\Http\Requests;

use App\Enums\CategoryType;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
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
        $primaryLocale = config('app.fallback_locale');

        $nameRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "name.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string', 'max:255']
                : ['nullable', 'string', 'max:255'],
        ])->all();

        return [
            'name' => ['required', 'array'],
            ...$nameRules,
            'type' => ['required', Rule::enum(CategoryType::class)],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        $primaryLocale = config('app.fallback_locale');

        return [
            'name.required' => 'The name field is required.',
            "name.{$primaryLocale}.required" => 'The name in the primary language is required.',
            'type.required' => 'The type field is required.',
        ];
    }
}
