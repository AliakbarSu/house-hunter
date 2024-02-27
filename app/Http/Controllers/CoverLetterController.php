<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CoverLetterController extends Controller
{
    public function generateCoverLetter(Request $request)
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
                        'content' => 'I need a cover letter for a rental application.'
                    ]
                ]
            ]);
            $content = $response->json('choices.0.message.content');
            return $content;
        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }

}
