<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->middleware('auth:sanctum')->group(function () {

    Route::prefix("/notes")->group(function () {
        Route::get("/", "NoteController@index");
        Route::post("/", "NoteController@store");
        Route::get("/{note}", "NoteController@show");
        Route::put("/{note}", "NoteController@update");
        Route::delete("/{note}", "NoteController@destroy");
    });
});

Route::middleware('auth:sanctum')->prefix('profile')->group(function () {
    Route::post('/', [ProfileController::class, 'addProfile']);
    Route::get('/{id}', [ProfileController::class, 'getProfile']);
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::get('/{id}', 'getUser');
});

Route::middleware('auth:sanctum')->controller(ListingController::class)->prefix('listing')->group(function () {

    Route::get('/', 'getAllListings');
    Route::get('/{id}', 'getListing');
    Route::post('/', 'addListing');
    Route::put('/{id}', 'updateListing');
    Route::delete('/{id}', 'deleteListing');

    Route::post('/{listing_id}/note', 'addNote');
    Route::delete('/{listing_id}/note/{note_id}', 'deleteNote');
});


Route::middleware('auth:sanctum')->controller(BoardController::class)->prefix('board')->group(function () {
    Route::post('/', 'addBoard');
    Route::get('/', 'getAllBoards');
    Route::get('/{id}', 'getBoard');
    Route::put('/{id}', 'updateBoard');
    Route::delete('/{id}', 'deleteBoard');
});

Route::middleware('auth:sanctum')->controller(ProfileController::class)->prefix('profile')->group(function () {
    Route::post('/', 'addProfile');
    Route::get('/{id}', 'getProfile');
    Route::put('/{id}', 'updateProfile');
    Route::delete('/{id}', 'deleteProfile');
});

Route::middleware('auth:sanctum')->controller(ProfileController::class)->prefix('checkout')->group(function () {
    Route::get('/plans', [CheckoutController::class, 'getPlans']);
});

Route::post('token', function (Request $request) {
    try {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

    } catch (ValidationException $e) {
        return response()->json([
            'errors' => $e->errors(),
            'status' => true
        ], 422);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken($request->device_name)->plainTextToken;
});
