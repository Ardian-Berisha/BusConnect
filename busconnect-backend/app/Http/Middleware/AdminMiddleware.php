<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        return $next($request);
    }
}
