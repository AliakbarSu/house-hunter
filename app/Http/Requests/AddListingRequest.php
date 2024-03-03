<?php

namespace App\Http\Requests;

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
            'title' => ['nullable', 'string', 'max:30'],
            'description' => ['nullable', 'string', 'max:255'],
            'rent' => ['nullable', 'numeric'],
            'status' => ['required', 'string', 'in:wishlist,viewing,viewed,applied,offer_accepted,offer_rejected', 'max:255'],
            'viewing_at' => ['nullable', 'date_format:Y-m-d'],
            'bedrooms' => ['required', 'numeric', 'min:0', 'max:15'],
            'bathrooms' => ['required', 'numeric', 'min:0', 'max:15'],
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
