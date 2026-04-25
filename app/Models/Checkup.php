<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Checkup extends Model
{
    protected $fillable = [
        'customer_id',
        'checkup_date',
        'reason_for_visit',
        'diagnosis_or_notes',
    ];

    protected $casts = [
        'checkup_date' => 'date',
    ];

    // Sinasabi nito na ang checkup record na ito ay para sa isang specific na customer
    public function patients()
    {
        return $this->belongsTo(Patient::class);
    }
}
