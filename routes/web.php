<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

$useSSO = env('USE_SSO', false);
if (!$useSSO) {
    Route::get('/', function () {
        return view('welcome');
    });
} else {
    Route::get('/', function(){
        return redirect('https://training.auth.'.config('cognito.region').'.amazoncognito.com/authorize?response_type=token&client_id='.config('cognito.app_client_id').'&redirect_uri='.config('cognito.redirect_url'));
    });
}

Route::get('/books', function () {
    return view('book.index');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');
Route::get('/loginsso', [App\Http\Controllers\Auth\LoginController::class, 'loginsso'])->name('loginsso');
