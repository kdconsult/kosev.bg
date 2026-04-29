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
        return [
            'name' => ['required', 'array'],
            'name.bg' => ['required', 'string'],
            'name.en' => ['string'],
            'description' => ['required', 'array'],
            'description.bg' => ['required', 'string'],
            'description.en' => ['string'],
            'active' => ['required', 'boolean'],
            'pdf' => ['required', 'file', 'mimes:pdf'],
        ];
    }
}
