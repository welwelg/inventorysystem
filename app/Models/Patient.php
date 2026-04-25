<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
        'date_of_birth',
        'notes',
    ];
    public function checkups()
    {
        return $this->hasMany(Checkup::class);
    }
}
