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
        return view('auth.login');
    })->name('login');
    Route::get('/logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');
} else {
    Route::get('/', function(){
        return redirect('https://training.auth.'.config('cognito.region').'.amazoncognito.com/authorize?response_type=code&client_id='.config('cognito.app_client_id').'&redirect_uri='.config('cognito.redirect_url'));
    })->name('login');
    Route::get('/logout', function(){
        return redirect('https://training.auth.'.config('cognito.region').'.amazoncognito.com/logout?response_type=code&client_id='.config('cognito.app_client_id').'&redirect_uri='.config('cognito.redirect_url'));
    })->name('logout');
}

Route::get('/books', [App\Http\Controllers\BookController::class, 'index'])->name('book.index');
Route::get('/books/create', [App\Http\Controllers\BookController::class, 'create'])->name('book.create');
Route::get('/books/edit/{book}', [App\Http\Controllers\BookController::class, 'edit'])->name('book.edit');

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/loginsso', [App\Http\Controllers\Auth\LoginController::class, 'loginsso'])->name('loginsso');
