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
        $primaryLocale = config('app.fallback_locale');

        $nameRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "name.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string', 'max:255']
                : ['nullable', 'string', 'max:255'],
        ])->all();

        $descriptionRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "description.{$locale}" => ['nullable', 'string'],
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
            'name' => ['required', 'array'],
            ...$nameRules,
            'description' => ['nullable', 'array'],
            ...$descriptionRules,
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
            ...$specLabelRules,
            'specs.*.value' => ['required', 'array'],
            ...$specValueRules,
        ];
    }
}
