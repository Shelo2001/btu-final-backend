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

    public function deleteMyQuizzes($id){
        Quiz::where("id",$id)->delete();
        return response()->json([
            "message"=>"successfully deleted"
        ]);
    }

    public function getAllQuizzesAdmin(){
        $approved_quizzes = Quiz::where("is_approved",1)->get();
        $unapproved_quizzes = Quiz::where("is_approved",0)->get();
        return response()->json([
            "approvedQuizzes"=>$approved_quizzes,
            "unapprovedQuizzes"=>$unapproved_quizzes
        ]);
    }

    public function makeApproved($id){
        $quiz = Quiz::find($id);
        $quiz->update(['is_approved' =>true]);
        $quiz->save();
        return response()->json([
            "message"=>"successfully Updated"
        ]);
    }

    public function getQuizDetails($id){
        $quiz = Quiz::find($id)->first();
        return response()->json([
            "quiz"=>$quiz
        ]);
    }

}
