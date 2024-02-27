<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function findUser($id)
    {
        return $this->all()->find($id)->load(['boards', 'listings']);
    }

    public function boards(): HasMany
    {
        return $this->hasMany(Board::class);
    }

    public function listings(): HasManyThrough
    {
        return $this->hasManyThrough(Listing::class, Board::class);
    }

    public function mainProfile()
    {
        return $this->profiles()->where('main_applicant', true)->first();
    }

    public function profiles(): HasMany
    {
        return $this->hasMany(Profile::class);
    }
}
