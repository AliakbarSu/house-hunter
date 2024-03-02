<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Laravel\Cashier\Invoice;

class SubscribedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Invoice $invoice, public User $user)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your subscription is active!',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.subscribed',
            with: ['invoice' => $this->invoice, 'url' => route('dashboard'), 'user' => $this->user],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
