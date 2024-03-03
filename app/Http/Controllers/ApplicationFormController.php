<?php

namespace App\Http\Controllers;

use App\Models\ApplicationForm;
use App\Models\Listing;
use App\Models\Profile;
use DateTime;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ApplicationFormController extends Controller
{
    public function getApplicationForm(Profile|null $profile, Listing $listing, $id)
    {
        $inputData = $this->getInputData($id, $profile, $listing);
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
                    "jsonDataForMerge" => $inputData
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

    private function getInputData(int $id, Profile|null $profile, Listing $listing)
    {
        try {
            $current_address = $profile?->addresses()->where('address_type', "current_address")->first();
            $previous_address = $profile?->addresses()->where('address_type', "previous_address")->first();
            $current_address_move_in_at = new DateTime($current_address?->move_in_at);
            $previous_address_move_in_at = new DateTime($previous_address?->move_in_at);
            $length_of_lease = $current_address_move_in_at->diff(new DateTime($current_address?->move_out_at));
            $previous_address_length_of_lease = $previous_address_move_in_at->diff(new DateTime($previous_address?->move_out_at));
            $data = [
                "property" => [
                    "address" => $listing->address,
                    "preferred_move_in_date" => null,
                ],
                "applicant" => [
                    "name" => $profile?->name,
                    "first_name" => explode(" ", $profile?->name)[0] ?? null,
                    "last_name" => explode(" ", $profile?->name)[1] ?? null,
                    "email" => $profile?->email,
                    "phone" => $profile?->phone,
                    "mobile" => $profile?->mobile,
                    "address" => $current_address?->address,
                    "move_in_date" => $this->formatDate($current_address?->move_in_at),
                    "move_out_date" => $this->formatDate($previous_address?->move_out_at),
                    "rent" => $current_address?->rent,
                    "rent_frequency" => $current_address?->rent_frequency,
                    "length_of_lease" => $current_address?->move_in_at ? $length_of_lease->format('%y years, %m months, %d days') : null,
                ],
                "current_landlord" => [
                    "type" => "current",
                    "name" => $previous_address?->landlord_name,
                    "phone" => $previous_address?->landlord_phone,
                    "email" => $previous_address?->landlord_email,
                ],
                "previous_address" => [
                    "address" => $previous_address?->address,
                    "move_in_at" => $this->formatDate($previous_address?->move_in_at),
                    "move_out_at" => $this->formatDate($previous_address?->move_out_at),
                    "rent" => $previous_address?->rent,
                    "length_of_lease" => $previous_address?->move_in_at ? $previous_address_length_of_lease->format('%y years, %m months, %d days') : null,
                ],
                "reference_1" =>
                    [
                        "name" => $profile?->references[0]?->name,
                        "phone" => $profile?->references[0]?->phone,
                        "email" => $profile?->references[0]?->email,
                        'mobile' => $profile?->references[0]?->mobile,
                        "relationship" => $profile?->references[0]?->relationship,

                    ],
                "reference_2" =>
                    [
                        "name" => $profile?->references[1]?->name,
                        "phone" => $profile?->references[1]?->phone,
                        "email" => $profile?->references[1]?->email,
                        'mobile' => $profile?->references[0]?->mobile,
                        "relationship" => $profile?->references[1]?->relationship,

                    ]
            ];
            return match ($id) {
                1 => $data,
                2 => $data
            };
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return $e->getMessage();
        }
    }

    private function formatDate($date)
    {
        if ($date) {
            try {
                return (new DateTime($date))->format('Y-m-d');
            } catch (Exception $e) {
                Log::error($e->getMessage());
                return $e->getMessage();
            }
        }
        return null;
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

    private function getInputApplicationForm(int $id)
    {
        return match ($id) {
            1 => 'input-application-forms/application_form_barfoot.docx',
            2 => 'input-application-forms/application_form_raywhite.docx',
            default => 'input-application-forms/application_form_barfoot.docx',
        };
    }
}
