<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Trabajadores;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class LoginController extends Controller
{
    public function autenticacion (LoginRequest $request)
    {
        $credentials = $request->only('usuario', 'password');
        // $usuario = Usuario::where('usuario', $request->usuario)->first();
        if (Auth::guard('usuario')->attempt($credentials)) {
            return response()->json(['message' => 'Login successfull'], 200);
        } else {
            return response()->json(['message' => 'Credenciales no validas'], 401);
        }
    }
    
    public function logout(Request $request)
    {
        //usamos el metodo de laravel ya creado logout
        Auth::guard()->logout();

        $request->session()->flush();
        $request->session()->invalidate();

        return redirect('/');
    }
    
}
