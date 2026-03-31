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
            'description' => ['required', 'array'],
            'description.bg' => ['required', 'string'],
            'active' => ['required', 'boolean'],
            'pdf' => ['required', 'file', 'mimes:pdf'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'name.bg.required' => 'The name in Bulgarian is required.',
            'description.required' => 'The description field is required.',
            'description.bg.required' => 'The description in Bulgarian is required.',
            'active.required' => 'The active field is required.',
            'active.boolean' => 'The active field must be true or false.',
            'pdf.required' => 'The PDF field is required.',
            'pdf.file' => 'The PDF field must be a file.',
            'pdf.mimes' => 'The PDF field must be a PDF file.',
        ];
    }
}
