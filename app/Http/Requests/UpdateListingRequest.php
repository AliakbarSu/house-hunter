<?php

namespace App\Http\Requests;

use App\Rules\Name;
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
            'title' => ['nullable', 'string', 'max:60'],
            'description' => ['nullable', 'string', 'max:255'],
            'rent' => ['numeric'],
            'price' => ['nullable', 'numeric'],
            'size' => ['nullable', 'numeric'],
            'amenities' => ['array', 'max:100'],
            'amenities.*.id' => ['string', 'max:255'],
            'amenities.*.name' => ['string', 'max:255'],
            'amenities.*.checked' => ['boolean'],
            'pros' => ['array', 'max:50'],
            'pros.*' => ['string', 'max:255'],
            'cons' => ['array', 'max:50'],
            'link' => ['nullable', 'string', 'max:255'],
            'bedrooms' => ['numeric', 'max:15'],
            'bathrooms' => ['numeric', 'max:15'],
            'garages' => ['numeric', 'max:15'],
            'toilets' => ['numeric', 'max:15'],
            'property_type' => ['string', 'in:house,apartment,condo'],
            'real_estate' => ['nullable', 'string', 'max:255'],
            'agent' => ['nullable', 'string', new Name()],
            'landlord' => ['nullable', 'string', new Name()],
            'board_id' => ['numeric', "exists:boards,id"],
            'images' => ['nullable', 'array', 'max:3'],
            'images.*' => ['image', 'max:2048', 'mimes:jpeg,png,jpg,gif,svg'],
            "status" => ["string", 'exists:board_columns,type'],
            'viewing_at' => ['nullable', 'date_format:Y-m-d'],
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
