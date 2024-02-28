<x-mail::message>
    # Introduction

    Thanks for subscribing to our newsletter. We'll keep you updated with the latest news and offers.

    <x-mail::button :url="''">
        Button Text
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>
