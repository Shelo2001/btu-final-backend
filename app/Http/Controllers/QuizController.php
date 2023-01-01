<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function createQuiz(Request $request, User $user){


        $attr=$request->validate([
            'image' => 'required',
            'title' => 'required',
            'description' => 'required',
            'user_id' => 'required',
        ]);

        $quiz = Quiz::create([
            'image' => $attr['image'],
            'title' => $attr['title'],
            'description' => $attr['description'],
            'user_id'=>$attr['user_id'],
        ]);

        return response()->json([
            "quiz" => $quiz,
        ]);
    }

    public function getMyQuizes(Request $request, User $user){
        $quiz = $user->Quiz;
        return response()->json([
            "quiz" => $quiz,
        ]);
    }

    public function getAllQuizzes(){
        $quizzes = Quiz::where("is_approved",1)->get();
        return response()->json([
            "quizzes" => $quizzes,
        ]);
    }

}
