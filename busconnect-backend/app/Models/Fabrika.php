<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fabrika extends Model
{
    use HasFactory;

    protected $primaryKey = 'FabrikaID';
    protected $fillable = ['Name','Location'];

    public function punetoret()
    {
        return $this->hasMany(Punetori::class, 'Punetori_ID');
    }
}
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
