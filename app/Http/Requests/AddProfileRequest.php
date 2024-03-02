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
            'name' => ['nullable', 'string', 'max:15', 'min:1'],
            'phone' => ['nullable', 'string', 'max:15', 'min:7'],
            'mobile' => ['nullable', 'string', 'max:15', 'min:8'],
            'email' => ['nullable', 'email'],
            'current_address.address' => ['nullable', 'string', 'max:30', 'min:5'],
            'current_address.move_in_at' => ['nullable', 'date_format:Y-m-d'],
            'current_address.move_out_at' => ['nullable', 'date_format:Y-m-d'],
            'previous_address.address' => ['nullable', 'string', 'max:30', 'min:5'],
            'previous_address.move_in_at' => ['nullable', 'date_format:Y-m-d'],
            'previous_address.move_out_at' => ['nullable', 'date_format:Y-m-d'],
            'previous_address.landlord_name' => ['nullable', 'string', 'max:15', 'min:1'],
            'previous_address.landlord_phone' => ['nullable', 'string', 'max:15', 'min:7'],
            'previous_address.landlord_mobile' => ['nullable', 'string', 'max:15', 'min:8'],
            'previous_address.landlord_email' => ['nullable', 'email'],
            'previous_address.landlord_type' => ['nullable', "in:landlord,agent,property_manager", 'string'],
            'previous_address.rent' => ['nullable', 'numeric', 'max:999999', 'min:10'],
            'previous_address.rent_frequency' => ['nullable', "in:weekly,fortnightly,monthly"],
            'references' => ['array'],
            'references.*.id' => ['nullable', 'numeric'],
            'references.*.name' => ['nullable', 'max:15', 'min:1'],
            'references.*.relationship' => ['nullable', 'string', 'max:20'],
            'references.*.phone' => ['nullable', 'string', 'max:15', 'min:7'],
            'references.*.mobile' => ['nullable', 'string', 'max:15', 'min:8'],
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
