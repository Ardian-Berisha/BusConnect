<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBusRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        $id = $this->route('bus'); // implicit binding or {bus}
        return [
            'name'         => 'sometimes|required|string|max:255',
            'plate_number' => 'sometimes|required|string|max:50|unique:buses,plate_number,' . $id,
            'capacity'     => 'sometimes|required|integer|min:1|max:1000',
        ];
    }
}
