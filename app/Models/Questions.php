<?php

namespace App\Models;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Questions extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'image',
        "answer1",
        "answer2",
        "answer3",
        "answer4",
        "correct_answer",
        "quiz_id"
    ];

    public function Quiz(){
        return $this->belongsTo(Quiz::class);
    }
}
