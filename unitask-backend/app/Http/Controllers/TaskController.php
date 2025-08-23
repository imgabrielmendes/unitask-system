<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Models\User;
use App\Models\Task;

class TaskController extends Controller
{
<<<<<<< HEAD

        public function getTasksForUser(Request $request)
        {
            $userId = auth()->id();

            $tasks = Task::with(['assignedUser', 'team'])
                        ->assignedTo($userId)
                        ->orderBy('due_date')
                        ->paginate(10);

            return response()->json($tasks);
        }
=======

    public function getTaskforUser(){

    $userId = Auth::id();
    
    $task = Task::getTaskforIdUser($userId);

    return response()->json($task);

    }
>>>>>>> 54b7ea1d7b4c0eae695fd35953b435dee4fe259a
}
