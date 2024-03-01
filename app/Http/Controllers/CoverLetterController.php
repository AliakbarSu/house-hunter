<?php

namespace App\Http\Controllers;

use App\Models\CoverLetter;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CoverLetterController extends Controller
{
    public function generateCoverLetter(Request $request, Listing $listing)
    {
        $name = $listing->profile?->name ? $listing->profile?->name : '[Placeholder]';
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
                        'content' => "Generate me a cover letter for a rental property listing. My name is $name.
                        the address address for property is $listing->address. I am interested in this house because it is super close to school"
                    ]
                ]
            ]);
            $content = $response->json('choices.0.message.content');
            $coverLetter = new CoverLetter();
            $filePath = 'cover_letter_' . uniqid() . '.txt';
            Storage::disk('s3')->put($filePath, $content);
            $coverLetter->url = Storage::disk('s3')->url($filePath);
            $coverLetter->filename = basename($filePath);
            $coverLetter->listing_id = $listing->id;
            $coverLetter->save();
            return $coverLetter;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }

    }

    public function downloadCoverLetter(Request $request, CoverLetter $coverLetter)
    {
        return Storage::disk('s3')->download($coverLetter->filename);
    }

}
