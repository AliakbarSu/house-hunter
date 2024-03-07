<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type', 'checklist'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class);
    }

    public function columns(): HasMany
    {
        return $this->hasMany(BoardColumn::class);
    }

    protected function checklist(): Attribute
    {
        return Attribute::make(
            get: fn(string|null $value) => $value ? json_decode($value, true) : [],
            set: fn(array|null $value) => $value ? json_encode($value) : json_encode([]),
        );
    }
}
