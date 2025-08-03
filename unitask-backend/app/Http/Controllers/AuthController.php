<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
        public function login(Request $request)
        {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Credenciais inválidas'], 401);
            }

            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        }

}
