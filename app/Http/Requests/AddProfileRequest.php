<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddProfileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:15'],
            'phone' => ['nullable', 'string', 'max:255'],
            'mobile' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'current_address.address' => ['nullable', 'string', 'max:10'],
            'current_address.move_in_at' => ['nullable', 'string'],
            'current_address.move_out_at' => ['nullable', 'string'],
            'previous_address.address' => ['nullable', 'string', 'max:255'],
            'previous_address.move_in_at' => ['nullable', 'string'],
            'previous_address.move_out_at' => ['nullable', 'string'],
            'previous_address.landlord_name' => ['nullable', 'string', 'max:255'],
            'previous_address.landlord_phone' => ['nullable', 'string', 'max:255'],
            'previous_address.landlord_mobile' => ['nullable', 'string', 'max:255'],
            'previous_address.landlord_email' => ['nullable', 'string', 'email', 'max:255'],
            'previous_address.landlord_type' => ['nullable', "in:landlord,agent,property_manager", 'string', 'max:255'],
            'previous_address.rent' => ['nullable', 'numeric'],
            'previous_address.rent_frequency' => ['nullable', "in:weekly,fortnightly,monthly", 'string', 'max:255'],
            'references' => ['array'],
            'references.*.id' => ['nullable', 'numeric'],
            'references.*.name' => ['nullable', 'string', 'max:15'],
            'references.*.relationship' => ['nullable', 'string', 'max:255'],
            'references.*.phone' => ['nullable', 'string', 'max:255'],
            'references.*.mobile' => ['nullable', 'string', 'max:255'],
        ];
    }

//    protected function failedValidation(Validator $validator)
//    {
//        throw new HttpResponseException(response()->json([
//            'errors' => $validator->errors(),
//            'status' => true
//        ], 422));
//    }
}
