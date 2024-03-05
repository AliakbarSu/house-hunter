<?php

namespace App\Http\Middleware;

use App\Http\Controllers\UserController;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureListingLimit
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $controller = new UserController();
        if (!$controller->canAddListing($request)) {
            return back()->withInput()->withErrors(['listing_limit' => 'You have reached the maximum number of listings']);
        }
        return $next($request);
    }
}
