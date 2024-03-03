<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddProfileRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Address;
use App\Models\Profile;
use App\Models\Reference;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{

    public function getProfile(Request $request, Profile $profile)
    {
        $fetchedProfile = $profile->find($request->user()->id);
        return $fetchedProfile?->load('addresses', 'references');
    }

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

    public function addProfile(AddProfileRequest $request): Profile
    {
        $validated = $request->validated();
        if ($request->user()->mainProfile()) {
            return $this->updateProfile($request);
        }
        $validated['main_applicant'] = true;
        $newProfile = new Profile($validated);
        $newProfile->user()->associate($request->user()->id);
        $newProfile->save();
        for ($i = 0; $i < count($validated['references']); $i++) {
            $reference = new Reference($validated['references'][$i]);
            $reference->profile()->associate($newProfile->id);
            $reference->save();
        }
        $currentAddress = new Address([...$validated['current_address'], 'address_type' => 'current_address']);
        $previousAddress = new Address([...$validated['previous_address'], 'address_type' => 'previous_address']);
        $previousAddress->profile()->associate($newProfile->id);
        $currentAddress->profile()->associate($newProfile->id);
        $currentAddress->save();
        $previousAddress->save();
        return $newProfile->load('addresses', 'references');
    }

    public function updateProfile(AddProfileRequest $request): Profile
    {
        $validated = $request->validated();
        $profile = $request->user()->mainProfile();
        $profile->fill($validated);
        foreach ($validated['references'] as $reference) {
            $foundReference = $profile->references->find($reference['id']);
            $foundReference?->fill($reference);
            $foundReference?->save();
        }
        foreach ($profile->addresses as $address) {
            $address->fill($validated[$address->address_type]);
            $address->save();
        }
        $profile->save();
        return $profile->load('addresses', 'references');
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

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

//        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
