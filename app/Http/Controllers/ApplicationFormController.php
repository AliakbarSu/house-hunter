<?php

namespace App\Http\Controllers;

use App\Models\ApplicationForm;
use App\Models\Listing;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ApplicationFormController extends Controller
{
    public function getApplicationForm(Listing $listing, $id)
    {
        $token = $this->getAuthToken();
        try {
            $filled_application_form_name = "output-application-forms/application_for_listing_id_$listing->id.pdf";
            ['url' => $tempUploadUrl,] = Storage::disk('s3')->temporaryUploadUrl("$filled_application_form_name", now()->addMinutes(60));
            $response = Http::withToken($token)->withHeaders(['x-api-key' => config('services.adobe.key')])->post(config('services.adobe.pdf_url'), [
                "input" => [
                    "uri" => Storage::disk('s3')->temporaryUrl($this->getInputApplicationForm($id), now()->addMinutes(60)),
                    "storage" => "S3"
                ],
                "output" => [
                    "uri" => $tempUploadUrl,
                    "storage" => "S3"
                ],
                "params" => [
                    "jsonDataForMerge" => [
                        "Name" => "ali"
                    ]
                ]

            ]);
            $error = $response->json('error');
            Log::info($response->json());
            if ($error) {
                Log::error($error);
                throw new Exception("Something went wrong");
            }
            $form = new ApplicationForm([
                'listing_id' => $listing->id,
                'filename' => $filled_application_form_name,
                'url' => null
            ]);
            $form->save();
            return $form;
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }

    private function getAuthToken(): string
    {
        try {
            $response = Http::asForm()->post(config('services.adobe.token_url'), [
                'client_id' => config('services.adobe.key'),
                'client_secret' => config('services.adobe.secret'),
                'grant_type' => config('services.adobe.grant_type'),
                'scope' => config('services.adobe.scope')
            ]);
            $error = $response->json('error');
            if ($error) {
                throw new Exception($error);
            }
            return $response->json('access_token');
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }

    private function getInputApplicationForm($id)
    {
        return match ($id) {
            1 => 'input-application-forms/application_form_barfoot.docx',
            2 => 'input-application-forms/application_form_raywhite.docx',
            default => 'input-application-forms/application_form_barfoot.docx',
        };
    }
}
