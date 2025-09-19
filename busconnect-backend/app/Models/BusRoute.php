<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusRoute extends Model
{
    use HasFactory;

    protected $fillable = [
        'bus_id',
        'origin',
        'destination',
        'departure_time',
        'arrival_time',
        'price',
    ];

    protected $casts = [
        'departure_time' => 'datetime',
        'arrival_time'   => 'datetime',
        'price'          => 'decimal:2',
    ];

    /**
     * Relationships
     */
    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'bus_route_id');
    }

    public function user() // optional, if tracking creator
    {
        return $this->belongsTo(User::class);
    }
}
