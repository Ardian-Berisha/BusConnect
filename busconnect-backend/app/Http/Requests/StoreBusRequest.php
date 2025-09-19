<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBusRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Allow all for now; handle via middleware/roles separately
        return true;
    }

    public function rules(): array
    {
        return [
            'name'         => 'required|string|max:255',
            'plate_number' => 'required|string|max:50|unique:buses,plate_number',
            'capacity'     => 'required|integer|min:1|max:1000',
        ];
    }
}
