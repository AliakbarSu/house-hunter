<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BoardController extends Controller
{


    public function getAllboards(Request $request, Board $board)
    {
        return $board->get()->load(['listings' => ['notes', 'images']]);
    }

    public function getBoard(Request $request, Board $board)
    {
        $boardId = $request->id;
        return $board->find($boardId)->load(['listings' => ['notes', 'images']]);
    }

    public function addBoard(Request $request, User $user)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255']
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
                'status' => true
            ], 422);
        }
        $user = $user->find($request->user()->id);
        $newBoard = new Board($validated);
        $newBoard->user()->associate($user);
        $newBoard->save();
        return $newBoard->makeHidden('user');
    }

    public function updateBoard(Request $request, Board $board)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255']
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors(),
                'status' => true
            ], 422);
        }
        $boardId = $request->id;
        $updatedBoard = $board->find($boardId);
        $updatedBoard->update($validated);
        $updatedBoard->save();
        return $updatedBoard;
    }

    /**
     * Update the user's profile information.
     */

    public function deleteBoard(Request $request, Board $board)
    {
        $boardId = $request->id;
        return $board->find($boardId)->load('listings')->delete();
    }

}
