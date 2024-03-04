<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddListingNoteRequest;
use App\Http\Requests\AddListingRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateListingNoteRequest;
use App\Http\Requests\UpdateListingRequest;
use App\Models\Image;
use App\Models\Listing;
use App\Models\ListingNotes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ListingController extends Controller
{


    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Delete the user's account.
     */

    public function getAllListings(Request $request, Listing $listing)
    {
        return $listing->get()->load('notes', 'board', 'images');
    }

    public function getListing(Request $request, Listing $listing)
    {
        $listingId = $request->id;
        return $listing->find($listingId)->load('notes', 'board', 'images');
    }

    public function addListing(AddListingRequest $request)
    {
        $board_id = $request->board_id;
        $newListing = new Listing($request->validated());
        $newListing->board()->associate($board_id);
        $newListing->save();

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imagefile) {
                $image = new Image;
                $path = Storage::disk('s3')->put("listing_images/$newListing->id", $imagefile);
                Storage::disk('s3')->setVisibility($path, 'public');
                $image->url = Storage::disk('s3')->url($path);
                $image->filename = basename($path);
                $image->listing_id = $newListing->id;
                $image->save();
            }
        }


        return $newListing->load('notes', 'board', 'images');
    }

    public function updateListing(UpdateListingRequest $request, Listing $listing)
    {
        $validated = $request->validated();
        $listing->update($validated);
        $listing->save();

        if ($request->hasFile('images')) {
            Image::where('listing_id', $listing->id)->delete();
            foreach ($request->file('images') as $imagefile) {
                $image = new Image;
                $path = Storage::disk('s3')->put('listing_images', $imagefile);
                Storage::disk('s3')->setVisibility($path, 'public');
                $image->url = Storage::disk('s3')->url($path);
                $image->filename = basename($path);
                $image->listing_id = $listing->id;
                $image->save();
            }
        }
        return $listing->load('notes', 'board', 'images');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function deleteListing(Request $request, Listing $listing)
    {
        $listingId = $request->id;
        $toBeDeletedListing = $listing->find($listingId)->load('notes', 'images');
        foreach ($toBeDeletedListing->images as $image) {
            Storage::disk('s3')->delete('listing_images' . $listingId . '/' . $image->filename);
        }
        return $toBeDeletedListing->delete();
    }

    public function deleteNote(Request $request, ListingNotes $note)
    {
        $note->delete();
        return $note;
    }

    public function addNote(AddListingNoteRequest $request, Listing $listing)
    {
        return $listing->notes()->create($request->validated());
    }

    public function updateNote(UpdateListingNoteRequest $request, Listing $listing, ListingNotes $note)
    {
        $note->update($request->validated());
        return $note;
    }
}
