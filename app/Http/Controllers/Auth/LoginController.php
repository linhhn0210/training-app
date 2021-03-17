<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => 'required|string',
        ]);
    }

    protected function credentials(Request $request)
    {
        return array_merge($request->only($this->username()));
    }

    public function username()
    {
        return 'username';
    }

    public function loginsso(Request $request)
    {
        $code = $request->get('code');

        $url = 'https://training.auth.'.config('cognito.region').'.amazoncognito.com/oauth2/token';

        $data = 'grant_type=authorization_code';
        $data .= '&client_id='.config('cognito.app_client_id');
        $data .= '&code='.$code;
        $data .= '&redirect_uri='.config('cognito.redirect_url');

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,TRUE);

        $response = curl_exec($ch);
        curl_close ($ch);
        $tokens = json_decode($response, true);

        $accessToken = $tokens['access_token'] ?? '';

        $userSso = $this->getUserInfo($accessToken);

        $data = [
            'username' => $userSso['username'] ?? '',
            'email' => $userSso['email'] ?? '',
            'name' => $userSso['sub'] ?? '',
            'password' => ''
        ];

        $user = User::where('username', $userSso['username'])->updateOrCreate($data);

        Auth()->login($user);

        return redirect()->route('book.index');
    }

    public function getUserInfo($token = "")
    {
        if (!$token) {
            return [];
        }
        $url = 'https://training.auth.'.config('cognito.region').'.amazoncognito.com/oauth2/userInfo';
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Authorization: Bearer '.$token]);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,TRUE);

        $response = curl_exec($ch);
        curl_close ($ch);
        return json_decode($response, true);
    }

    public function logout(Request $request) {
        Auth::logout();
        return redirect('/logoutsso');
    }

}
