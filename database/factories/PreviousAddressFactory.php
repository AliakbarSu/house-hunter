<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PreviousAddress>
 */
class PreviousAddressFactory extends Factory
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
            'move_in_at' => $this->faker->dateTimeThisCentury->format('Y-m-d H:i:s'),
            'move_out_at' => $this->faker->dateTimeThisCentury->format('Y-m-d H:i:s'),
            'rent' => $this->faker->randomFloat(2, 100, 1000),
            'rent_frequency' => $this->faker->randomElement(['weekly', 'fortnightly', 'monthly']),
            'landlord_name' => $this->faker->name,
            'landlord_phone' => $this->faker->phoneNumber,
            'landlord_mobile' => $this->faker->phoneNumber,
            'landlord_type' => $this->faker->randomElement(['agent', 'landlord', 'property_manager']),
        ];
    }
}
