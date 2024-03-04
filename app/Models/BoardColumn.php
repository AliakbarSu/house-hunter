<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardColumn extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'type', 'board_id', 'color'];
}
