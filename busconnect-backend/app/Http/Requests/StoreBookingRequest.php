<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        // The booking route itself can be protected with jwt.auth
        return true;
    }

    public function rules(): array
    {
        return [
            'bus_route_id' => 'required|exists:bus_routes,id',
            'seat_number'  => 'required|integer|min:1|max:1000',
            // status not required here; defaults to 'booked'
        ];
    }
}
