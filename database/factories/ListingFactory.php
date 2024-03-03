<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Listing>
 */
class ListingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address' => $this->faker->address,
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'rent' => $this->faker->numberBetween(1000, 10000),
            'bedrooms' => $this->faker->numberBetween(1, 5),
            'bathrooms' => $this->faker->numberBetween(1, 3),
            'garages' => $this->faker->numberBetween(0, 2),
            'toilets' => $this->faker->numberBetween(1, 3),
            'status' => $this->faker->randomElement(['wishlist', 'viewing', 'viewed', 'applied', 'offer_accepted', 'offer_rejected']),
            'viewing_at' => $this->faker->dateTimeBetween('now', '+1 month'),
        ];
    }
}
