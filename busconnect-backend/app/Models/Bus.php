<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'plate_number',
        'capacity',
    ];

    /**
     * Relationships
     */
    public function busRoutes()
    {
        return $this->hasMany(BusRoute::class);
    }

    public function user() // optional, if tying a bus to a creator
    {
        return $this->belongsTo(User::class);
    }
}
