<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\CoverLetterController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use App\Http\Requests\AddListingNoteRequest;
use App\Http\Requests\AddListingRequest;
use App\Http\Requests\AddProfileRequest;
use App\Http\Requests\UpdateListingRequest;
use App\Models\Board;
use App\Models\CoverLetter;
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

Route::get('/', function (StripeController $stripeController) {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'plans' => $stripeController->getPlans()
    ]);
})->name('home');

Route::get('/checkout/item/{priceId}', function (Request $request) {
    $priceId = $request->priceId;
    return $request->user()
        ->newSubscription('default', $priceId)
        ->allowPromotionCodes()
        ->checkout([
            'success_url' => route('stripe.checkout-success'),
            'cancel_url' => route('home'),
        ]);
})->middleware(["auth:sanctum"])->name('stripe.checkout');


Route::get('/checkout/success', function () {
    return Inertia::render('Checkout/Success');
})->name('stripe.checkout-success');

Route::get('/checkout/fail', function () {
    return Inertia::render('Checkout/Fail');
})->name('stripe.checkout-fail');

Route::get('/billing-portal', function (Request $request) {
    return $request->user()->redirectToBillingPortal();
})->middleware(["auth:sanctum"])->name('stripe.billing-portal');


Route::get('/dashboard', function () {
    return Inertia::render('Checkout/Success');
})->name('free.plan.limit.reached');


Route::middleware('auth:sanctum')->get('/dashboard', function (Request $request) {
    return Inertia::render('Dashboard');
})->middleware(['auth:sanctum', 'verified'])->name('dashboard');

Route::get('/dashboard2', function () {
    return Inertia::render('Dashboard2');
})->name('dashboard2');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/rental-profile', function (AddProfileRequest $request, ProfileController $profileController) {
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
    })->middleware('listing.limit');
    Route::put('/{listing}', function (UpdateListingRequest $request, ListingController $listingController, Listing $listing) {
        $listingController->updateListing($request, $listing);
        return redirect()->route('dashboard');
    })->name('listing.update');
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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/rental-profile', function (Request $request, ProfileController $profileController, Profile $profile) {
        $fetchedProfile = $profileController->getProfile($request, $profile);
        return Inertia::render('Profile', ['profile' => $fetchedProfile]);
    })->name('profile.rental');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cover-letter', function () {
        return Inertia::render('CoverLetter');
    })->name('cover-letter.view');

    Route::get('/cover-letter/{listing}', function (Request $request, CoverLetterController $coverLetterController, Listing $listing) {
        return Inertia::render('CoverLetter/view');
    });
    Route::post('/cover-letter/{listing}', function (Request $request, CoverLetterController $coverLetterController, Listing $listing) {
        if (!$listing->canGenerateCoverLetter()) {
            return Inertia::render('CoverLetter')->with('error', 'You have reached the limit of cover letters for this address');
        }
        $coverLetterController->generateCoverLetter($request, $listing);
        return redirect()->route('cover-letter.view');
    })->name('cover-letter.generate');
    Route::get('/cover-letter/{coverLetter}/download', function (Request $request, CoverLetterController $coverLetterController, CoverLetter $coverLetter) {
        return $coverLetterController->downloadCoverLetter($request, $coverLetter);
    })->name('cover-letter.download');
});

require __DIR__ . '/auth.php';
