<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateListingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'address' => ['string', 'min:2', 'max:255'],
            'title' => ['string', 'max:255'],
            'description' => ['string', 'max:255'],
            'rent' => ['numeric'],
            'bedrooms' => ['numeric'],
            'bathrooms' => ['numeric'],
            'garages' => ['numeric'],
            'toilets' => ['numeric'],
            'property_type' => ['string', 'in:house,apartment,condo'],
            'board_id' => ['numeric', "exists:boards,id"],
            "status" => ["string", 'in:wishlist,viewing,viewed,applied,offer_accepted,offer_rejected']
        ];
    }

    public function messages(): array
    {
        return [
            'address.min' => 'The property type must be one of: house, apartment, condo',
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
