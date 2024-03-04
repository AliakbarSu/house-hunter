<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'title',
        'description',
        'rent',
        'status',
        'bedrooms',
        'bathrooms',
        'garages',
        'property_type',
        'viewing_at'
    ];

    public function notes(): HasMany
    {
        return $this->hasMany(ListingNotes::class);
    }

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }

    public function canGenerateCoverLetter(): bool
    {
        return $this->coverLetter()->count() < 3;
    }

    public function coverLetter(): HasMany
    {
        return $this->hasMany(CoverLetter::class);
    }

    public function applicationForms(): HasMany
    {
        return $this->hasMany(ApplicationForm::class);
    }

    public function columns(): HasManyThrough
    {
        return $this->hasManyThrough(BoardColumn::class, Board::class, 'id', 'board_id', 'board_id', 'id');
    }
}
