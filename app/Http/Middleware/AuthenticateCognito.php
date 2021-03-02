<?php

namespace App\Http\Middleware;

use Closure;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Http;

class AuthenticateCognito
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
//        $client = new CognitoIdentityProviderClient([
//            'version' => config('cognito.version'),
//            'region' => config('cognito.region'),
//            'credentials' => config('cognito.credentials'),
//        ]);
//
//        $result = null;
//        if (isset($_GET["code"]) && $_GET["code"] !== '') {
//            $result = $client->getUser([
//                'AccessToken' => $_GET["access_token"] ?? '',
//            ]);
//        }
//        if ($result == null || empty($result)) {
//            return Redirect::to(config('app.APP_URL'));
//        }

        return $next($request);
    }
}
