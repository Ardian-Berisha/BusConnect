<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBusRouteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'bus_id'         => 'sometimes|required|exists:buses,id',
            'origin'         => 'sometimes|required|string|max:255',
            'destination'    => 'sometimes|required|string|max:255',
            'departure_time' => 'sometimes|required|date',
            'arrival_time'   => 'sometimes|required|date|after:departure_time',
            'price'          => 'sometimes|required|numeric|min:0',
        ];
    }
}
