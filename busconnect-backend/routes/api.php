<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\BusRouteController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Public Routes (no token needed)
|--------------------------------------------------------------------------
*/
// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public read-only buses & routes
Route::get('/buses', [BusController::class, 'index']);
Route::get('/buses/{bus}', [BusController::class, 'show']);
Route::get('/routes', [BusRouteController::class, 'index']);
Route::get('/routes/{route}', [BusRouteController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Authenticated Routes (token required)
|--------------------------------------------------------------------------
*/
Route::middleware(['jwt.auth'])->group(function () {
    // Current user info + logout + refresh token
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Self-service update/delete for current user
    Route::put('/me', [UserController::class, 'updateSelf']);
    Route::delete('/me', [UserController::class, 'destroySelf']);

    // Authenticated user bookings (can view/create their own bookings)
    Route::apiResource('bookings', BookingController::class);
});

/*
|--------------------------------------------------------------------------
| Admin Routes (token + admin middleware required)
|--------------------------------------------------------------------------
*/
Route::middleware(['jwt.auth', 'admin'])->group(function () {
    // Full CRUD for buses and routes (write endpoints)
    Route::post('/buses', [BusController::class, 'store']);
    Route::put('/buses/{bus}', [BusController::class, 'update']);
    Route::delete('/buses/{bus}', [BusController::class, 'destroy']);

    Route::post('/routes', [BusRouteController::class, 'store']);
    Route::put('/routes/{route}', [BusRouteController::class, 'update']);
    Route::delete('/routes/{route}', [BusRouteController::class, 'destroy']);

    // Admin access to all users
    Route::apiResource('users', UserController::class);
});
