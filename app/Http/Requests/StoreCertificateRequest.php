<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCertificateRequest extends FormRequest
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
        $primaryLocale = config('app.fallback_locale');

        $nameRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "name.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string']
                : ['nullable', 'string'],
        ])->all();

        $descriptionRules = collect(config('app.locales'))->mapWithKeys(fn ($locale) => [
            "description.{$locale}" => $locale === $primaryLocale
                ? ['required', 'string']
                : ['nullable', 'string'],
        ])->all();

        return [
            'name' => ['required', 'array'],
            ...$nameRules,
            'description' => ['required', 'array'],
            ...$descriptionRules,
            'active' => ['required', 'boolean'],
            'pdf' => ['required', 'file', 'mimes:pdf'],
        ];
    }
}
