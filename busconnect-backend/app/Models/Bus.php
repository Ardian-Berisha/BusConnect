<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    protected $fillable = ['name','plate_number','capacity'];

    public function busRoutes()
    {
        return $this->hasMany(BusRoute::class);
    }

    public function user() // if you tie creation to a user (optional)
    {
        return $this->belongsTo(User::class);
    }
}
