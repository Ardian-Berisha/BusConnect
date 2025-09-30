<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        // Admin only
        return response()->json(User::all());
    }

    public function show(User $user)
    {
        return response()->json($user);
    }

    public function store(Request $request)
    {
        // Admin can create user and set role
        $data = $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:6',
            'role'=>'in:user,admin'
        ]);

        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'role'=>$data['role'] ?? 'user',
        ]);

        return response()->json($user,201);
    }

    public function update(Request $request, User $user)
    {
        // Admin can update including role
        $data = $request->validate([
            'name'=>'sometimes|required|string|max:255',
            'email'=>'sometimes|required|email|unique:users,email,'.$user->id,
            'password'=>'sometimes|nullable|string|min:6',
            'role'=>'sometimes|in:user,admin'
        ]);

        if(isset($data['password'])){
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message'=>'Deleted']);
    }

    public function updateSelf(Request $request)
    {
        $user = auth('api')->user();
        // No role field here
        $data = $request->validate([
            'name'=>'sometimes|required|string|max:255',
            'email'=>'sometimes|required|email|unique:users,email,'.$user->id,
            'password'=>'sometimes|nullable|string|min:6',
        ]);

        if(isset($data['password'])){
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function destroySelf()
    {
        $user = auth('api')->user();
        $user->delete();
        return response()->json(['message'=>'Account deleted']);
    }
}
