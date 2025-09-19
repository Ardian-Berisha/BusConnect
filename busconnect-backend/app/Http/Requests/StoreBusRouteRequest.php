<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBusRouteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'bus_id'         => 'required|exists:buses,id',
            'origin'         => 'required|string|max:255',
            'destination'    => 'required|string|max:255',
            'departure_time' => 'required|date',
            'arrival_time'   => 'required|date|after:departure_time',
            'price'          => 'required|numeric|min:0',
        ];
    }
}
