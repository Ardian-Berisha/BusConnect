<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // The route model binding will give you the Bus instance
        $busId = $this->route('bus')?->id ?? $this->route('bus');

        return [
            'name'         => 'sometimes|required|string|max:255',
            'plate_number' => 'sometimes|required|string|max:50|unique:buses,plate_number,' . $busId,
            'capacity'     => 'sometimes|required|integer|min:1|max:1000',
        ];
    }
}
