<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'openai' => [
        'secret' => env('OPENAI_API_KEY'),
    ],

    'adobe' => [
        'token_url' => 'https://ims-na1.adobelogin.com/ims/token/v3',
        'pdf_url' => 'https://pdf-services.adobe.io/operation/documentgeneration',
        'key' => env('ADOBE_API_KEY'),
        'secret' => env('ADOBE_API_SECRET'),
        'grant_type' => 'client_credentials',
        'scope' => 'openid, AdobeID, DCAPI',
    ]

];
