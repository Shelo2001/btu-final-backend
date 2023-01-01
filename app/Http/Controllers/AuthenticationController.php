<?php

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function createAccount(Request $request){
        $attr = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);
        $token = $user->createToken('Tokens')->plainTextToken;
        return response([
            "token"=>$token,
            "user"=>$user
        ],201);
    }

    public function signin(Request $request){
        $attr = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->error('Credentials not match', 401);
        }

        return response([
            'token' => auth()->user()->createToken('Tokens')->plainTextToken,
            'user' => auth()->user()
        ], 200);
    }

    public function signout(Request $request){
        auth()->user()->currentAccessToken()->delete();

        return response(["message"=>"Successfully logged out"],200);
    }


}