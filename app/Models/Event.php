<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = 'events';


    protected $fillable = [
        'event_id',
        'event_img',
        'event_name',
        'event_cat',
        'start_time',
        'end_time',
        'event_organization',
        'max_people',
        'status',
        'description',
        'event_address',
        'event_latitude',
        'event_longitude',
        'event_status',
    ];

}
