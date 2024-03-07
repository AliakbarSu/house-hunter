<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\BoardColumn;
use Illuminate\Http\Request;

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
            'name' => ['required', 'string', 'max:20'],
            'type' => ['required', 'string', 'in:buy,rent'],
        ]);
        $user = $request->user();
        $newBoard = new Board($validated);
        $newBoard->checklist = $this->getBoardChecklist($newBoard);
        $newBoard->user()->associate($user);
        $newBoard->save();
        $this->createColumns($newBoard);
        return $newBoard->makeHidden('user');
    }

    private function getBoardChecklist($board)
    {
        if ($board->type == 'buy') {
            return [[
                'id' => 1,
                'title' => 'Buy Checklist',
                'description' => 'This is a checklist for buying a property',
                'checked' => false
            ]];
        } else {
            return [[
                'id' => 1,
                'title' => 'Rent Checklist',
                'description' => 'This is a checklist for renting a property',
                'checked' => false
            ]];
        }

    }

    private function createColumns(Board $board)
    {
        $rent_columns = [
            ['title' => 'Wishlist', 'color' => 'indigo-400', 'type' => 'wishlist', 'board_id' => $board->id],
            ['title' => 'Viewing', 'color' => 'sky-400', 'type' => "viewing", 'board_id' => $board->id],
            ['title' => 'Viewed', 'color' => 'purple-400', 'type' => 'viewed', 'board_id' => $board->id],
            ['title' => 'Applied', 'color' => 'pink-400', 'type' => 'applied', 'board_id' => $board->id],
            ['title' => 'Application Rejected', 'color' => 'orange-400', 'type' => 'application_rejected', 'board_id' => $board->id],
            ['title' => 'Application Accepted', 'color' => 'teal-400', 'type' => 'application_accepted', 'board_id' => $board->id]
        ];
        $buy_columns = [
            ['title' => 'Wishlist', 'color' => 'indigo-400', 'type' => 'wishlist', 'board_id' => $board->id],
            ['title' => 'Viewing', 'color' => 'sky-400', 'type' => "viewing", 'board_id' => $board->id],
            ['title' => 'Viewed', 'color' => 'purple-400', 'type' => 'viewed', 'board_id' => $board->id],
            ['title' => 'Offer Made', 'color' => 'pink-400', 'type' => 'offer_made', 'board_id' => $board->id],
            ['title' => 'Offer Declined', 'color' => 'orange-400', 'type' => 'offer_declined', 'board_id' => $board->id],
            ['title' => 'Pre Settlement Inspection', 'color' => 'yellow-400', 'type' => 'pre_settlement_inspection', 'board_id' => $board->id],
            ['title' => 'Offer Accepted', 'color' => 'teal-400', 'type' => 'offer_accepted', 'board_id' => $board->id]
        ];
        if ($board->type == 'buy') {
            $columns = $buy_columns;
        } else {
            $columns = $rent_columns;
        }
        foreach ($columns as $column) {
            $newColumn = new BoardColumn($column);
            $newColumn->save();
        }
    }

    public function updateBoard(Request $request, Board $board)
    {
        $validated = $request->validate([
            'name' => ['string', 'max:255'],
            'checklist' => ['array'],
            'checklist.*.id' => ['required', 'integer'],
            'checklist.*.title' => ['required', 'string', 'max:255'],
            'checklist.*.description' => ['required', 'string', 'max:255'],
            'checklist.*.checked' => ['required', 'boolean'],
        ]);

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
