<?php

namespace App\Listeners;

use App\Mail\SubscribedMail;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class StripeEventListener
{
    public function __construct()
    {
    }

    public function handle(WebhookReceived $event): void
    {

        if ($event->payload['type'] === 'invoice.paid') {
            try {
                // Let's find the relevant user/billable
                $billing_reason = $event->payload['data']['object']['billing_reason'];
                if ($billing_reason === 'subscription_cycle') {
                    return;
                }
                $stripeCustomerId = $event->payload['data']['object']['customer'];
                $user = User::where('stripe_id', $stripeCustomerId)->first();
                $billable = Cashier::findBillable($stripeCustomerId);

                // Get the Laravel\Cashier\Invoice object
                $invoice = $billable->findInvoice($event->payload['data']['object']['id']);

                // Now we can send the invoice!
                Mail::to($billable)->send(new SubscribedMail($invoice, $user));
            } catch (\Exception $e) {
                // Handle the exception
                Log::error($e->getMessage());
            }

        }
    }
}
