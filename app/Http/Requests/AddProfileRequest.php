<?php

namespace App\Http\Requests;

use App\Rules\Mobile;
use App\Rules\Name;
use App\Rules\PhoneNumber;
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
            'name' => ['nullable', new Name()],
            'phone' => ['nullable', new PhoneNumber()],
            'mobile' => ['nullable', new Mobile()],
            'email' => ['nullable', 'email'],
            'current_address.address' => ['nullable', 'string', 'max:100', 'min:5'],
            'current_address.move_in_at' => ['nullable', 'date_format:Y-m-d'],
            'current_address.move_out_at' => ['nullable', 'date_format:Y-m-d'],
            'previous_address.address' => ['nullable', 'string', 'max:100', 'min:5'],
            'previous_address.move_in_at' => ['nullable', 'date_format:Y-m-d'],
            'previous_address.move_out_at' => ['nullable', 'date_format:Y-m-d'],
            'previous_address.landlord_name' => ['nullable', new Name()],
            'previous_address.landlord_phone' => ['nullable', new PhoneNumber()],
            'previous_address.landlord_mobile' => ['nullable', new Mobile()],
            'previous_address.landlord_email' => ['nullable', 'email'],
            'previous_address.landlord_type' => ['nullable', "in:landlord,agent,property_manager", 'string'],
            'previous_address.rent' => ['nullable', 'numeric', 'max:999999', 'min:10'],
            'previous_address.rent_frequency' => ['nullable', "in:weekly,fortnightly,monthly"],
            'references' => ['array'],
            'references.*.id' => ['nullable', 'numeric'],
            'references.*.name' => ['nullable', new Name()],
            'references.*.relationship' => ['nullable', 'string', 'max:20'],
            'references.*.phone' => ['nullable', new PhoneNumber()],
            'references.*.mobile' => ['nullable', new Mobile()],
        ];
    }

    public function messages(): array
    {
        return [
            'address.min' => 'The current address must be more than 5 characters',
            'current_address.address.max' => 'The current address must be less than 100 characters',
            'previous_address.address.min' => 'The previous address must be more than 5 characters',
            'previous_address.address.max' => 'The previous address must be less than 100 characters',
            'references.*.id.numeric' => 'The reference id must be a number',
            'references.*.relationship.max' => 'The reference relationship must be less than 20 characters',
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
