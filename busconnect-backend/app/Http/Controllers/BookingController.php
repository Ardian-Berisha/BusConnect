<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;

class BookingController extends Controller
{
    public function index()
    {
        // current user's bookings
        return Booking::with(['busRoute.bus'])
            ->where('user_id', auth('api')->id())
            ->latest()->get();
    }

    public function store(StoreBookingRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth('api')->id();

        // (Optional) You can enforce seat uniqueness per route here
        // if (Booking::where('bus_route_id',$data['bus_route_id'])->where('seat_number',$data['seat_number'])->exists()) {
        //     return response()->json(['message'=>'Seat already booked'], 422);
        // }

        $booking = Booking::create($data);
        return response()->json($booking->load('busRoute.bus'), 201);
    }

    public function show(Booking $booking)
    {
        $this->authorizeBooking($booking);
        return $booking->load('busRoute.bus','user');
    }

    public function update(UpdateBookingRequest $request, Booking $booking)
    {
        $this->authorizeBooking($booking);
        $booking->update($request->validated());
        return response()->json($booking->load('busRoute.bus'));
    }

    public function destroy(Booking $booking)
    {
        $this->authorizeBooking($booking);
        $booking->delete();
        return response()->json(['message'=>'Deleted']);
    }

    private function authorizeBooking(Booking $booking): void
    {
        if ($booking->user_id !== auth('api')->id()) {
            abort(403, 'Forbidden');
        }
    }
}
