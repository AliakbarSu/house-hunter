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
            return [
                [
                    'id' => 1,
                    'title' => 'Define Your Budget',
                    'description' => 'Determine how much you can afford to spend on a property.',
                    'checked' => false
                ],
                [
                    'id' => 2,
                    'title' => 'Get Pre-Approved for a Mortgage',
                    'description' => 'Contact lenders to get pre-approved for a mortgage.
                                        Understand the terms and conditions of the mortgage,
                                        including interest rates, loan term, and repayment options.',
                    'checked' => false
                ],
                [
                    'id' => 3,
                    'title' => 'Research Locations',
                    'description' => 'Research different neighborhoods and suburbs to find the right location for your needs.
                                        Consider factors such as proximity to schools, parks, shops, public transport, and work.',
                    'checked' => false
                ],
                [
                    'id' => 4,
                    'title' => 'Property Search',
                    'description' => 'Attend open homes and property viewings to inspect potential properties.
                                        Take note of the property’s condition, features, and location.',
                    'checked' => false
                ],
                [
                    'id' => 5,
                    'title' => 'Engage a Real Estate Agent',
                    'description' => 'Choose an agent with local knowledge and experience in the area you\'re interested in.',
                    'checked' => false
                ],
                [
                    'id' => 6,
                    'title' => 'Make an Offer',
                    'description' => 'Submit an offer to purchase the property through your real estate agent.
                                    Negotiate the terms of the sale, including the purchase price, settlement date,
                                    and any conditions (e.g., subject to finance, subject to building inspection).',
                    'checked' => false
                ],
                [
                    'id' => 7,
                    'title' => 'Finalize the Sale',
                    'description' => 'Sign the sale and purchase agreement once all terms are agreed upon. Pay the deposit and arrange for a building inspection and a lawyer to review the contract.',
                    'checked' => false
                ],
                [
                    'id' => 8,
                    'title' => 'Settlement',
                    'description' => 'Pay the remaining balance of the purchase price on the settlement date. Complete all necessary paperwork and receive the keys to your new home.',
                    'checked' => false
                ],
                [
                    'id' => 9,
                    'title' => 'Celebrate Your New Home',
                    'description' => 'Celebrate your successful home purchase with family and friends!',
                    'final' => true,
                    'checked' => false
                ]
            ];
        } else {
            return [
                [
                    'id' => 1,
                    'title' => 'Determine Your Budget',
                    'description' => 'Calculate how much you can afford to spend on rent each week or month.',
                    'checked' => false
                ],
                [
                    'id' => 2,
                    'title' => 'Research Locations',
                    'description' => 'Research different neighborhoods and suburbs to find the right location for your needs. Consider factors such as proximity to public transport, schools, shops, parks, and work.',
                    'checked' => false
                ],
                [
                    'id' => 3,
                    'title' => 'Property Search',
                    'description' => 'Start your property search online through real estate websites, rental listings, and property management websites.',
                    'checked' => false
                ],
                [
                    'id' => 4,
                    'title' => 'Conduct Property Inspections',
                    'description' => 'Schedule property inspections to view the rental property in person. Check for any damage, defects, or maintenance issues and discuss with the landlord or property manager.',
                    'checked' => false
                ],
                [
                    'id' => 5,
                    'title' => 'Submit Rental Application',
                    'description' => 'Complete a rental application form provided by the landlord or property manager.',
                    'checked' => false
                ],
                [
                    'id' => 6,
                    'title' => 'Review and Sign Lease Agreement',
                    'description' => 'Review the terms of the Residential Tenancy Agreement (lease) carefully. Seek clarification on any terms or conditions you\'re unsure about.',
                    'checked' => false
                ],
                [
                    'id' => 7,
                    'title' => 'Pay Bond (Security Deposit)',
                    'description' => 'Pay the bond (security deposit) as specified in the lease agreement.',
                    'checked' => false
                ],
                [
                    'id' => 8,
                    'title' => 'Set Up Utilities',
                    'description' => 'Arrange for utilities (electricity, gas, water) to be connected in your name. Update your address with relevant utility providers.',
                    'checked' => false
                ],
                [
                    'id' => 9,
                    'title' => 'Settle Into Your New Home',
                    'description' => 'Settle into your new rental home and familiarize yourself with the property and neighborhood. Keep communication lines open with the landlord or property manager for any maintenance issues or concerns.',
                    'checked' => false,
                    'final' => true
                ]
            ];
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
            'checklist.*.description' => ['required', 'string', 'max:1000'],
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
