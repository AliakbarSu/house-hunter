<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function getPlans(Request $request)
    {
        return response()->json([], 201);
    }
}
