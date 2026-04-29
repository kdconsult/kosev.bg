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
        $primaryLocale = config('app.fallback_locale');

        $titleRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "title.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string', 'max:255']
                : ['nullable', 'string', 'max:255'],
        ])->all();

        $descriptionRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "description.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string']
                : ['nullable', 'string'],
        ])->all();

        $specLabelRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "specs.*.label.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string', 'max:255']
                : ['nullable', 'string', 'max:255'],
        ])->all();

        $specValueRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "specs.*.value.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string', 'max:255']
                : ['nullable', 'string', 'max:255'],
        ])->all();

        return [
            'title' => ['required', 'array'],
            ...$titleRules,
            'description' => ['required', 'array'],
            ...$descriptionRules,
            'category_id' => ['nullable', 'exists:categories,id'],
            'coverImage' => ['nullable', 'image', 'max:2048'],
            'images' => ['nullable', 'array'],
            'images.*' => ['image', 'max:2048'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:100'],
            'specs' => ['nullable', 'array'],
            'specs.*.label' => ['required', 'array'],
            ...$specLabelRules,
            'specs.*.value' => ['required', 'array'],
            ...$specValueRules,
        ];
    }
}
