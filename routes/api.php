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

Route::get('/books', [App\Http\Controllers\BookController::class, 'index'])->name('book.list');

Route::get('/books/{book}', [App\Http\Controllers\BookController::class, 'show'])->name('book.one');

Route::post('/books', [App\Http\Controllers\BookController::class, 'store'])->name('book.store');

Route::put('/books/{book}', [App\Http\Controllers\BookController::class, 'update'])->name('book.update');

Route::delete('/books/{book}', [App\Http\Controllers\BookController::class, 'destroy'])->name('book.destroy');
