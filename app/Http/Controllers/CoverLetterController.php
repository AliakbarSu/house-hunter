<?php

namespace App\Http\Controllers;

use App\Models\CoverLetter;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class CoverLetterController extends Controller
{
    public function generateCoverLetter(Request $request, Listing $listing)
    {
        try {
            $response = Http::withToken(config('services.openai.secret'))->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are an AI.'
                    ],
                    [
                        'role' => 'user',
                        'content' => 'Generate me a cover letter for a rental property listing. My name is Ali and the house is a townhouse. Address is 33 Symonds street, I am interested in this house because it is super close to school'
                    ]
                ]
            ]);
            $content = $response->json('choices.0.message.content');
            $coverLetter = new CoverLetter();
            $filePath = 'cover_letters' . uniqid() . '.txt';
            Storage::disk('s3')->put($filePath, $content);
            Storage::disk('s3')->setVisibility($filePath, 'public');
            $coverLetter->url = Storage::disk('s3')->url($filePath);
            $coverLetter->filename = basename($filePath);
            $coverLetter->listing_id = $listing->id;
            $coverLetter->save();
            return $coverLetter;
        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }

}
