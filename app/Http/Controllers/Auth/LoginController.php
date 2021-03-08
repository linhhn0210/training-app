<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
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

        $request->session()->put('id_token', $tokens['id_token']);
        $request->session()->put('access_token', $tokens['access_token']);
        $request->session()->put('refresh_token', $tokens['refresh_token']);

        $client = new CognitoIdentityProviderClient([
            'version' => config('cognito.version'),
            'region' => config('cognito.region'),
            'credentials' => config('cognito.credentials'),
        ]);
        $accessToken = $tokens['access_token'] ?? '';
        $user = $client->getUser(
            ['AccessToken' => $accessToken]
        );

        $userName = $user['Username'] ?? '';

        if (!$userName) {
            return redirect()->route('login');
        }
        $request->session()->put('userLogin', $userName);

        return redirect()->route('book.index');
    }

}
