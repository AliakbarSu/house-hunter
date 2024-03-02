<x-mail::message>
# Hi {{ $user->name }}

Your subscription to {{ config('app.name') }} has been confirmed. You're all set to use all the premium features.

### Here's a summary of your invoice:
- Invoice ID: {{ $invoice->id }}
- Date: {{ $invoice->date()->toFormattedDateString() }}
- Total: {{ $invoice->total() }}

<x-mail::button :url="$invoice->invoice_pdf">
    Download PDF
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
