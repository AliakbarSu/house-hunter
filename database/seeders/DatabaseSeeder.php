<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = \App\Models\User::factory(1)->create();

        $profiles = \App\Models\Profile::factory(1)->create([
            'user_id' => $users->random()->id
        ]);

        $boards = \App\Models\Board::factory(1)->create([
            'user_id' => $users->random()->id
        ]);

        $listings = \App\Models\Listing::factory(1)->create([
            'board_id' => $boards->random()->id
        ]);

        $notes = \App\Models\ListingNotes::factory(1)->create([
            'listing_id' => $listings->random()->id
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
