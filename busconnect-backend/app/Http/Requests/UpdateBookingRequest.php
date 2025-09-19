<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'seat_number' => 'sometimes|required|integer|min:1|max:1000',
            'status'      => 'sometimes|required|in:booked,cancelled',
        ];
    }
}
