<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionsController;
use App\Http\Controllers\AuthenticationController;

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

Route::post('/signup', [AuthenticationController::class, 'createAccount']);
Route::post('/signin', [AuthenticationController::class, 'signin']);
Route::get('/quiz/all',[QuizController::class, 'getAllQuizzes']);
Route::get('/quiz/details/{id}',[QuizController::class, 'getQuizDetails']);


Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::get('/logout', [AuthenticationController::class, 'signout']);
    Route::post('/quiz/create',[QuizController::class, 'createQuiz']);
    Route::get('/quiz/{user}',[QuizController::class, 'getMyQuizes']);
    Route::get('/quiz/delete/{id}',[QuizController::class, 'deleteMyQuizzes']);
    Route::get('/admin/quiz/all',[QuizController::class, 'getAllQuizzesAdmin']);
    Route::get('/admin/quiz/update/{id}',[QuizController::class, 'makeApproved']);
    Route::post('/quiz/question/create',[QuestionsController::class, 'createQuestion']); 
    Route::get('/quiz/questions/{quiz}',[QuestionsController::class, 'getQuizQuestions']); 

});
