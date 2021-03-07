<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function loginsso(Request $request)
    {
        $code = $request->get('code');
//        $curl = "curl --request POST --url 'https://training.auth.ap-northeast-1.amazoncognito.com/oauth2/token' --header 'content-type: application/x-www-form-urlencoded' --data grant_type=authorization_code --data client_id=73jp3ve5nho4spjad74tululql --data code={$code} --data redirect_uri='http://localhost/loginsso'";
//        $response = exec($curl);
        var_dump($code);die();
    }
}
