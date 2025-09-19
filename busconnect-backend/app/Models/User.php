<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $fillable = ['name','email','password','role'];
    protected $hidden = ['password','remember_token'];

    // JWTSubject
    public function getJWTIdentifier() { return $this->getKey(); }
    public function getJWTCustomClaims() { return []; }

    public function bookings() { return $this->hasMany(Booking::class); }
    public function buses()    { return $this->hasMany(Bus::class); }
    public function busRoutes(){ return $this->hasMany(BusRoute::class); }
}
