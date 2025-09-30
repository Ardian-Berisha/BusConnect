<?php

namespace App\Http\Controllers;

use App\Models\Fabrika;
use Illuminate\Http\Request;

class fabrikaController extends Controller
{
    public function index() {
        return Fabrika::with('punetoret')->get();
    }

    public function show(Fabrika $fabrika) {
        return $fabrika->load('fabrika');
    }

    public function store(Request $request) {
        $data = $request->validate([
            'Name' => 'required|string|max:255',
            'Location'   => 'required|string|max:255',
        ]);
        return Fabrika::create($data);
    }

    public function update(Request $request, Fabrika $fabrika) {
        $data = $request->validate([
            'Name' => 'required|string|max:255',
            'Location'   => 'required|string|max:255',
        ]);
        $fabrika->update($data);
        return $fabrika;
    }

    public function destroy(Fabrika $fabrika) {
        $fabrika->delete();
        return response()->json(['message' => 'Deleted']);
    }
}


