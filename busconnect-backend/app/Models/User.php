<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * JWT Implementation
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Relationships
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function buses() // if you want to track which user added buses
    {
        return $this->hasMany(Bus::class);
    }

    public function busRoutes() // if you want to track which user added routes
    {
        return $this->hasMany(BusRoute::class);
    }
}
