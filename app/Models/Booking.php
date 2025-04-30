<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'booking';

    protected $fillable = [
        'user_name',
        'user_email',
        'user_phone',
        'user_city',
        'user_state',
        'user_pin',
        'user_country',
        'event_start_date',
        'event_end_date',
        'ticket_quantity',
        'event_id',
        'payment_status',
        'total_amount'
    ];

}
