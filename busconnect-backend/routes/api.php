


<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\BusRouteController;
use App\Http\Controllers\BookingController;
Route::get('/', function () {
    return view('welcome');
    Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:api'], function() {
    Route::apiResource('buses', BusController::class);
    Route::apiResource('routes', BusRouteController::class);
    Route::apiResource('bookings', BookingController::class);
});
});