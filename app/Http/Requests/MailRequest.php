<?php

namespace App\Http\Requests;

use App\Rules\Recaptcha;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MailRequest extends FormRequest
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
            'g-recaptcha-response' => ['required', 'string', new Recaptcha],
            'name' => ['required', 'string', 'max:255', 'min:2'],
            'email' => ['required', 'email', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'message' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'g-recaptcha-response.required' => 'The reCAPTCHA response is required.',
            'g-recaptcha-response.string' => 'The reCAPTCHA response must be a string.',
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name must not exceed 255 characters.',
            'name.min' => 'The name must be at least 2 characters.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.max' => 'The email must not exceed 255 characters.',
            'company.string' => 'The company must be a string.',
            'company.max' => 'The company must not exceed 255 characters.',
            'phone.string' => 'The phone number must be a string.',
            'phone.max' => 'The phone number must not exceed 20 characters.',
            'message.required' => 'The message field is required.',
            'message.string' => 'The message must be a string.',
        ];
    }
}
