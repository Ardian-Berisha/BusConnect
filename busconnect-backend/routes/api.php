<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\BusRouteController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;

// Auth
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/me',[AuthController::class,'me']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/refresh',[AuthController::class,'refresh']);

    // Self-service user update/delete
    Route::put('/me',[UserController::class,'updateSelf']);
    Route::delete('/me',[UserController::class,'destroySelf']);
});

// Admin-only CRUD
Route::middleware(['jwt.auth','admin'])->group(function(){
    Route::apiResource('buses',BusController::class);
    Route::apiResource('routes',BusRouteController::class);
});

// Authenticated user bookings
Route::middleware(['jwt.auth'])->group(function(){
    Route::apiResource('bookings',BookingController::class);
});

// Admin-only CRUD
Route::middleware(['jwt.auth','admin'])->group(function(){
    Route::apiResource('buses',BusController::class);
    Route::apiResource('routes',BusRouteController::class);
    Route::apiResource('users',UserController::class); // <— add this line
});

