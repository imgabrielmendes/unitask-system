<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Task;

class TaskController extends Controller
{
    public function getTaskforUser(){

    $user = Auth::user();   
    $userId = Auth::id();

    $task = Task::getTaskforIdUser($userId);

    return response()->json($task);

    }
}
