<?php

namespace App\Http\Requests;

use App\Rules\Name;
use Illuminate\Foundation\Http\FormRequest;

class AddListingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'address' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:60'],
            'description' => ['nullable', 'string', 'max:255'],
            'rent' => ['nullable', 'numeric'],
            'price' => ['nullable', 'numeric'],
            'size' => ['nullable', 'numeric'],
            'amenities' => ['array', 'string', 'max:255'],
            'amenities.*' => ['string', 'max:255'],
            'pros' => ['array', 'string', 'max:255'],
            'pros.*' => ['string', 'max:255'],
            'cons' => ['array', 'string', 'max:255'],
            'link' => ['nullable', 'string', 'max:255'],
            'cons.*' => ['string', 'max:255'],
            'status' => ['required', 'string', 'exists:board_columns,type', 'max:255'],
            'viewing_at' => ['nullable', 'date_format:Y-m-d'],
            'bedrooms' => ['required', 'numeric', 'min:0', 'max:15'],
            'bathrooms' => ['required', 'numeric', 'min:0', 'max:15'],
            'garages' => ['required', 'numeric', 'max:15'],
            'real_estate' => ['nullable', 'string', 'max:255'],
            'agent' => ['nullable', 'string', new Name()],
            'landlord' => ['nullable', 'string', new Name()],
            'images' => ['nullable', 'array', 'max:3'],
            'images.*' => ['image', 'max:2048', 'mimes:jpeg,png,jpg,gif,svg'],
            'board_id' => ['required', 'numeric', "exists:boards,id"],
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
