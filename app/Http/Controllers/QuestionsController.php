<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Questions;
use Illuminate\Http\Request;

class QuestionsController extends Controller
{
    public function createQuestion(Request $request, Quiz $quiz){

        $attr=$request->validate([
            "question"=>"required",
            "image"=>"required",
            "answer1"=>"required",
            "answer2"=>"required",
            "answer3"=>"required",
            "answer4"=>"required",
            "correct_answer"=>"required",
            "quiz_id"=>"required",
        ]);

        $question = Questions::create([
            'question' => $attr['question'],
            'image' => $attr['image'],
            'answer1' => $attr['answer1'],
            'answer2' => $attr['answer2'],
            'answer3'=>$attr['answer3'],
            'answer4'=>$attr['answer4'],
            'correct_answer'=>$attr['correct_answer'],
            'quiz_id'=>$attr['quiz_id'],
        ]);


        return response()->json([
            "question" => $question
        ]);
    }

    public function getQuizQuestions( Quiz $quiz){
        $questions = $quiz->Questions;

        return response()->json([
            "questions" => $questions
        ]);
    }
}
