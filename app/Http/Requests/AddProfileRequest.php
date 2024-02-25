<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'first_name' => ['string', 'max:255'],
            'last_name' => ['string', 'max:255'],
            'phone' => ['string', 'max:255'],
            'mobile' => ['string', 'max:255'],
            'email' => ['string', 'email', 'max:255'],
            'current_address' => ['string', 'max:255'],
            'move_in_at' => ['string'],
            'move_out_at' => ['string'],
            'previous_address' => ['string', 'max:255'],
            'previous_address_move_in_at' => ['string'],
            'previous_address_move_out_at' => ['string'],
            'landlord_name' => ['string', 'max:255'],
            'landlord_phone' => ['string', 'max:255'],
            'landlord_mobile' => ['string', 'max:255'],
            'landlord_email' => ['string', 'email', 'max:255'],
            'landlord_type' => ["in:landlord,agent,property_manager", 'string', 'max:255'],
            'references' => ['array'],
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors(),
            'status' => true
        ], 422));
    }
}
