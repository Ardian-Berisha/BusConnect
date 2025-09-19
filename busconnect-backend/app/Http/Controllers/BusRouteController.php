<?php

namespace App\Http\Controllers;

use App\Models\BusRoute;
use App\Http\Requests\StoreBusRouteRequest;
use App\Http\Requests\UpdateBusRouteRequest;

class BusRouteController extends Controller
{
    public function index()
    {
        return BusRoute::with('bus')->latest()->get();
    }

    public function store(StoreBusRouteRequest $request)
    {
        $route = BusRoute::create($request->validated());
        return response()->json($route->load('bus'), 201);
    }

    public function show(BusRoute $route)
    {
        return $route->load(['bus','bookings']);
    }

    public function update(UpdateBusRouteRequest $request, BusRoute $route)
    {
        $route->update($request->validated());
        return response()->json($route->load('bus'));
    }

    public function destroy(BusRoute $route)
    {
        $route->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
