<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingNotes extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
    ];
}