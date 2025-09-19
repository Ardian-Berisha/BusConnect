<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Http\Requests\StoreBusRequest;
use App\Http\Requests\UpdateBusRequest;

class BusController extends Controller
{
    public function index()
    {
        return Bus::latest()->get();
    }

    public function store(StoreBusRequest $request)
    {
        $bus = Bus::create($request->validated());
        return response()->json($bus, 201);
    }

    public function show(Bus $bus)
    {
        return $bus->load('busRoutes');
    }

    public function update(UpdateBusRequest $request, Bus $bus)
    {
        $bus->update($request->validated());
        return response()->json($bus);
    }

    public function destroy(Bus $bus)
    {
        $bus->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
