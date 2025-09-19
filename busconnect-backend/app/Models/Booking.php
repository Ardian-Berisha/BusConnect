<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bus_route_id',
        'seat_number',
        'status',
    ];

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function busRoute()
    {
        return $this->belongsTo(BusRoute::class, 'bus_route_id');
    }
}
