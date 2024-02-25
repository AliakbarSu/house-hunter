<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Board;
use App\Models\Image;
use App\Models\Listing;
use App\Models\ListingNotes;
use App\Models\Profile;
use App\Models\Reference;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory(1)->create();

        $profiles = Profile::factory(1)->create([
            'user_id' => $users->random()->id
        ]);

        $references = Reference::factory(3)->create([
            'profile_id' => $profiles->random()->id
        ]);

        $boards = Board::factory(1)->create([
            'user_id' => $users->random()->id
        ]);

        $listings = Listing::factory(2)->create([
            'board_id' => $boards->random()->id
        ]);

        $images = Image::factory(3)->create([
            'listing_id' => $listings->random()->id
        ]);

        $notes = ListingNotes::factory(1)->create([
            'listing_id' => $listings->random()->id
        ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
