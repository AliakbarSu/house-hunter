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
            'status' => ['string', 'max:255'],
            'bedrooms' => ['required', 'numeric', 'max:15'],
            'bathrooms' => ['required', 'numeric', 'max:15'],
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
