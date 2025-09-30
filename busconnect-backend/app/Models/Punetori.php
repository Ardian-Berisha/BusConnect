<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Punetori extends Model
{
    use HasFactory;

    protected $primaryKey = 'PunetoriID';
    protected $fillable = ['FirstName','LastName','Position','Fabrika_ID'];

    public function fabrikat()
    {
        return $this->belongsTo(Fabrika::class, 'Fabrika_ID');
    }
}
