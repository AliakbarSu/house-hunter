<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddListingNoteRequest;
use App\Http\Requests\AddListingRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateListingRequest;
use App\Models\Listing;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
        return $listing->get()->load('notes', 'board');
    }

    public function getListing(Request $request, Listing $listing)
    {
        $listingId = $request->id;
        return $listing->find($listingId)->load('notes', 'board');
    }

    public function addListing(AddListingRequest $request)
    {
        $board_id = $request->board_id;
        $newListing = new Listing($request->validated());
        $newListing->board()->associate($board_id);
        $newListing->save();
        return $newListing;
    }

    public function updateListing(UpdateListingRequest $request, Listing $listing)
    {
        $validated = $request->validated();
        $listingId = $request->id;
        $updatedListing = $listing->find($listingId);
        $updatedListing->update($validated);
        $updatedListing->save();
        return $updatedListing;
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
        return $listing->find($listingId)->load('notes')->delete();
    }

    public function deleteNote(Request $request, Listing $listing)
    {
        $listingId = $request->listing_id;
        $noteId = $request->note_id;
        $note = $listing->find($listingId)->notes()->where('id', $noteId)->delete();
        return $note;
    }

    public function addNote(AddListingNoteRequest $request, Listing $listing)
    {
        $listingId = $request->listing_id;
        return $listing->find($listingId)->notes()->create($request->validated());
    }
}
