<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix("/notes")->group(function () {
        Route::get("/", "NoteController@index");
        Route::post("/", "NoteController@store");
        Route::get("/{note}", "NoteController@show");
        Route::put("/{note}", "NoteController@update");
        Route::delete("/{note}", "NoteController@destroy");
    });
});

Route::controller(ProfileController::class)->prefix('profile')->group(function () {
    Route::get('/{id}', 'getProfile');
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::get('/{id}', 'getUser');
});

Route::controller(ListingController::class)->prefix('listing')->group(function () {

    Route::get('/', 'getAllListings');
    Route::get('/{id}', 'getListing');
    Route::post('/', 'addListing');
    Route::put('/{id}', 'updateListing');
    Route::delete('/{id}', 'deleteListing');

    Route::post('/{listing_id}/note', 'addNote');
    Route::delete('/{listing_id}/note/{note_id}', 'deleteNote');
});


Route::controller(BoardController::class)->prefix('board')->group(function () {
    Route::post('/', 'addBoard');
    Route::get('/', 'getAllBoards');
    Route::get('/{id}', 'getBoard');
    Route::put('/{id}', 'updateBoard');
    Route::delete('/{id}', 'deleteBoard');
});
