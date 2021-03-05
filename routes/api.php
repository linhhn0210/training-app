<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/books', [App\Http\Controllers\BookController::class, 'index'])->name('book.all');

Route::post('/books', [App\Http\Controllers\BookController::class, 'store'])->name('book.store');

Route::get('/books/{book}', 'BookController@show')->name('books.show');

Route::put('/books/{book}', 'BookController@update')->name('books.update');

Route::delete('/books/{book}', 'BookController@destory')->name('books.destroy');
