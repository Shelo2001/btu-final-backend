<?php

namespace App\Models;

use App\Models\User;
use App\Models\Questions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Quiz extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',"is_approved"
    ];

    public function User() {
        return $this->belongsTo(User::class);
    }

    public function Questions() {
        return $this->hasMany(Questions::class);
    }
}
