<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Requests\AddListingNoteRequest;
use App\Http\Requests\AddListingRequest;
use App\Http\Requests\AddProfileRequest;
use App\Http\Requests\UpdateListingRequest;
use App\Models\Board;
use App\Models\Listing;
use App\Models\Profile;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::post('/profile', function (AddProfileRequest $request, ProfileController $profileController) {
        $createdProfile = $profileController->addProfile($request);
        return Inertia::render('Profile', [
            'profile' => $createdProfile,
        ]);
    })->name('profile.add');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth:sanctum')->prefix('listing')->group(function () {

    Route::get('/', function (Request $request, ListingController $listingController, Listing $listing) {
        return $listingController->getAllListings($request, $listing);
    });
    Route::get('/{id}', function (Request $request, ListingController $listingController, Listing $listing) {
        return $listingController->getListing($request, $listing);
    });
    Route::post('/', function (AddListingRequest $request, ListingController $listingController) {
        return $listingController->addListing($request);
    });
    Route::put('/{id}', function (UpdateListingRequest $request, ListingController $listingController, Listing $listing) {
        return $listingController->updateListing($request, $listing);
    });
    Route::delete('/{id}', function (Request $request, ListingController $listingController, Listing $listing) {
        return $listingController->deleteListing($request, $listing);
    });

    Route::post('/{listing_id}/note', function (AddListingNoteRequest $request, ListingController $listingController, Listing $listing) {
        return $listingController->addNote($request, $listing);
    });
    Route::delete('/{listing_id}/note/{note_id}', function (Request $request, ListingController $listingController, Listing $listing) {
        return $listingController->deleteNote($request, $listing);
    });
});

Route::middleware('auth:sanctum')->prefix('board')->group(function () {
    Route::post('/', function (Request $request, BoardController $boardController) {
        return $boardController->addBoard($request);
    });
    Route::get('/', function (Request $request, BoardController $boardController, Board $board) {
        return $boardController->getAllboards($request, $board);
    });
    Route::get('/{id}', function (Request $request, BoardController $boardController, Board $board) {
        return $boardController->getBoard($request, $board);
    });
    Route::put('/{id}', function (Request $request, BoardController $boardController, Board $board) {
        return $boardController->updateBoard($request, $board);
    });
    Route::delete('/{id}', function (Request $request, BoardController $boardController, Board $board) {
        return $boardController->deleteBoard($request, $board);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/rental-profile', function (Request $request, ProfileController $profileController, Profile $profile) {
        $fetchedProfile = $profileController->getProfile($request, $profile);
        return Inertia::render('Profile', ['profile' => $fetchedProfile]);
    });
});

require __DIR__ . '/auth.php';
