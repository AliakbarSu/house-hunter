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
        $validated = $request->validate([
            'context' => ['required', 'string', 'max:100']
        ]);
        $context = $this->getContext($validated['context'], $listing);
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
                        'content' => $context
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

    private function getContext(string $context, Listing $listing): string
    {
        $profile = $listing->profile;
        return "User write me a cover letter for rental property. The address is $listing->address.
        My name is $profile?->name. I am interested in this house because $context.
        I am tidy, clean and will keep the house at a high standards. My email is $profile?->email. My phone number is $profile?->phone.
        My current address is $profile?->address. Today's date is " . date('Y-m-d') . ".
        I have a very good history of rental before and can provide references if needed. I always pay the rent on time.";
    }

    public function downloadCoverLetter(Request $request, CoverLetter $coverLetter)
    {
        return Storage::disk('s3')->download($coverLetter->filename);
    }

}
