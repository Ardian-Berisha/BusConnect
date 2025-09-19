<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\BusRouteController;
use App\Http\Controllers\BookingController;

// Auth
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::middleware(['jwt.auth'])->get('/me',[AuthController::class,'me']);

// Admin-only CRUD
Route::middleware(['jwt.auth','admin'])->group(function(){
    Route::apiResource('buses',BusController::class);
    Route::apiResource('routes',BusRouteController::class);
});

// Authenticated user bookings
Route::middleware(['jwt.auth'])->group(function(){
    Route::apiResource('bookings',BookingController::class);
});
