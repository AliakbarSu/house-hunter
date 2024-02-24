<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'title',
        'description',
        'rent',
        'bedrooms',
        'bathrooms',
        'property_type'
    ];

    public function notes(): HasMany
    {
        return $this->hasMany(ListingNotes::class);
    }

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }
}