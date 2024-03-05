<?php

use App\Http\Controllers\ApplicationFormController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\CoverLetterController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StripeController;
use App\Http\Requests\AddListingNoteRequest;
use App\Http\Requests\AddListingRequest;
use App\Http\Requests\AddProfileRequest;
use App\Http\Requests\UpdateListingNoteRequest;
use App\Http\Requests\UpdateListingRequest;
use App\Models\ApplicationForm;
use App\Models\Board;
use App\Models\CoverLetter;
use App\Models\Listing;
use App\Models\ListingNotes;
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

# ----------------- HOME ROUTES ----------------- #
Route::get('/', function (StripeController $stripeController) {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'plans' => $stripeController->getPlans()
    ]);
})->name('home');


# ----------------- CHECKOUT ROUTES ----------------- #
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
    return $request->user()->redirectToBillingPortal(route('dashboard'));
})->middleware(["auth:sanctum"])->name('stripe.billing-portal');

# ----------------- PROPERTY ROUTES ----------------- #
Route::get('/property', function (Request $request) {
    return Inertia::render('Property');
})->middleware('auth:sanctum')->name('properties.view');


# ----------------- DASHBOARD ROUTES ----------------- #
Route::get('/dashboard', function (Request $request) {
    if ($request->user()->boards->isEmpty()) {
        return Inertia::render('AddBoard');
    }
    return Inertia::render('Dashboard');
})->middleware('auth:sanctum')->name('dashboard');


# ----------------- PROFILE ROUTES ----------------- #
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/rental-profile', function (Request $request, ProfileController $profileController, Profile $profile) {
        $fetchedProfile = $profileController->getProfile($request, $profile);
        return Inertia::render('Profile', ['profile' => $fetchedProfile]);
    })->name('profile.rental');
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

# ----------------- LISTING ROUTES ----------------- #
Route::middleware('auth:sanctum')->prefix('listing')->group(function () {

    Route::get('/', function (Request $request, ListingController $listingController, Listing $listing) {
        return $listingController->getAllListings($request, $listing);
    });
    Route::get('/{id}', function (Request $request, ListingController $listingController, Listing $listing) {
        return $listingController->getListing($request, $listing);
    });
    Route::post('/', function (AddListingRequest $request, ListingController $listingController) {
        $listingController->addListing($request);
        return redirect()->route('dashboard');
    })->middleware('listing.limit')->name('listing.add');
    Route::post('/update/{listing}', function (UpdateListingRequest $request, ListingController $listingController, Listing $listing) {
        $listingController->updateListing($request, $listing);
        return redirect()->route('dashboard');
    })->name('listing.update');
    Route::delete('/{id}', function (Request $request, ListingController $listingController, Listing $listing) {
        return $listingController->deleteListing($request, $listing);
    });

    Route::post('/{listing}/note', function (AddListingNoteRequest $request, ListingController $listingController, Listing $listing) {
        $listingController->addNote($request, $listing);
        return redirect()->route('dashboard');
    })->name('listing.note.add');
    Route::post('/{listing}/note/{note}', function (UpdateListingNoteRequest $request, ListingController $listingController, Listing $listing, ListingNotes $note) {
        $listingController->updateNote($request, $listing, $note);
        return redirect()->route('dashboard');
    })->name('listing.note.update');
    Route::delete('/note/{note}', function (Request $request, ListingController $listingController, ListingNotes $note) {
        $listingController->deleteNote($request, $note);
        return redirect()->route('dashboard');
    })->name('listing.note.delete');
});


# ----------------- BOARD ROUTES ----------------- #
Route::middleware('auth:sanctum')->prefix('board')->group(function () {
    Route::post('/', function (Request $request, BoardController $boardController) {
        $boardController->addBoard($request);
        return redirect()->route('dashboard');
    })->name('board.add');
    Route::get('/', function () {
        return Inertia::render('AddBoard');
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

# ----------------- COVER LETTER ROUTES ----------------- #
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cover-letter', function (Request $request) {
        return Inertia::render('CoverLetter', ['listing_id' => $request->listing_id]);
    })->name('cover-letter.view');

    Route::get('/cover-letter/{listing}', function (Request $request, CoverLetterController $coverLetterController, Listing $listing) {
        return Inertia::render('CoverLetter/view');
    });
    Route::post('/cover-letter/{listing}', function (Request $request, CoverLetterController $coverLetterController, Listing $listing) {
        if (!$listing->canGenerateCoverLetter()) {
            return Inertia::render('CoverLetter')->with('error', 'You have reached the limit of cover letters for this address');
        }
        $coverLetterController->generateCoverLetter($request, $listing);
        return redirect()->route('cover-letter.view')->withInput();
    })->name('cover-letter.generate');
    Route::get('/cover-letter/{coverLetter}/download', function (Request $request, CoverLetterController $coverLetterController, CoverLetter $coverLetter) {
        return $coverLetterController->downloadCoverLetter($request, $coverLetter);
    })->name('cover-letter.download');
});

# ----------------- CALENDAR ROUTES ----------------- #
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/calendar', function () {
        return Inertia::render('Calendar');
    })->name('calendar');
    Route::post('/calendar/listing/{listing}', function (UpdateListingRequest $request, ListingController $listingController, Listing $listing) {
        $listingController->updateListing($request, $listing);
        return redirect()->route('calendar')->withInput();
    })->name('calendar.update.listing');
});

# ----------------- FORMS ROUTES ----------------- #
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/forms/generate/{listing}/{id}', function (Request $request, ApplicationFormController $applicationFormController, Listing $listing, $id) {
        $main_profile = $request->user()->profiles()->where('main_applicant', 1)->first();
        $applicationFormController->getApplicationForm($main_profile, $listing, $id);
        return redirect()->route('forms.view', ['listing_id' => $listing->id]);
    })->name('forms.generate');
    Route::get('/forms/view', function (Request $request) {
        return Inertia::render('ApplicationForm', ['listing_id' => $request->listing_id]);
    })->name('forms.view');
    Route::get('/forms/download/{form}', function (ApplicationForm $form) {
        try {
            $link = Storage::disk('s3')->temporaryUrl($form->filename, now()->addMinutes(5));
            return redirect($link);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => 'Something went wrong while downloading the file. Please try again later.']);
        }
    })->name('forms.download');
});


require __DIR__ . '/auth.php';
