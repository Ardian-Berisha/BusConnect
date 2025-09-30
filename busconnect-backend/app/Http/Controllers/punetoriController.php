<?php

namespace App\Http\Controllers;

use App\Models\Punetori;
use Illuminate\Http\Request;

class punetoriController extends Controller
{
    public function index() {
        return Punetori::with('Fabrika')->get();
    }

    public function show(Punetori $punetori) {
        return $punetori->load('punetori');
    }

    public function store(Request $request) {
        $data = $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName'  => 'required|string|max:255',
            'Position'   => 'required|string|max:255',
            
        ]);
        return Punetori::create($data);
    }

    public function update(Request $request, Punetori $punetori) {
        $data = $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName'  => 'required|string|max:255',
            'Position'   => 'required|string|max:255',
        ]);
        $punetori->update($data);
        return $punetori;
    }

    public function destroy(Punetori $punetori) {
        $punetori->delete();
        return response()->json(['message' => 'Deleted']);
    }
}


