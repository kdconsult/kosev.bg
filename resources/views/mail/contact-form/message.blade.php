<x-mail::message>
# Message from the Contact Form

<x-mail::panel>
### Company Name: {{ $data['company'] ?? 'N/A' }}
### Client Name: {{ $data['name'] }}
### Client Email: {{ $data['email'] }}
### Client Phone: {{ $data['phone'] ?? 'N/A' }}
</x-mail::panel>

<x-mail::subcopy>
### Message: 
{{ $data['message'] }}
</x-mail::subcopy>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
