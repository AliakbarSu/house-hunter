<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\BoardColumn;
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

    public function addBoard(Request $request)
    {

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:20']
        ]);
        $user = $request->user();
        $newBoard = new Board($validated);
        $newBoard->user()->associate($user);
        $newBoard->save();
        $this->createColumns($newBoard->id);
        return $newBoard->makeHidden('user');
    }

    private function createColumns($boardId)
    {
        $columns = [
            ['title' => 'Wishlist', 'color' => 'indigo-400', 'type' => 'wishlist', 'board_id' => $boardId],
            ['title' => 'Viewing', 'color' => 'sky-400', 'type' => "viewing", 'board_id' => $boardId],
            ['title' => 'Viewed', 'color' => 'purple-400', 'type' => 'viewed', 'board_id' => $boardId],
            ['title' => 'Applied', 'color' => 'pink-400', 'type' => 'applied', 'board_id' => $boardId],
            ['title' => 'Application Rejected', 'color' => 'orange-400', 'type' => 'application_rejected', 'board_id' => $boardId],
            ['title' => 'Application Accepted', 'color' => 'teal-400', 'type' => 'application_accepted', 'board_id' => $boardId]
        ];
        foreach ($columns as $column) {
            $newColumn = new BoardColumn($column);
            $newColumn->save();
        }
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
        };

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
