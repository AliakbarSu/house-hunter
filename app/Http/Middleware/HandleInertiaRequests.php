<?php

namespace App\Http\Middleware;

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $userController = app(UserController::class);
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'listings' => $request->user()->listings->load('notes', 'board', 'images'),
            'hasSubscription' => $request->user()?->subscribed('default'),
            'isAuthenticated' => auth()->check(),
            'can' => [
                'addListing' => $userController->canAddListing($request),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
