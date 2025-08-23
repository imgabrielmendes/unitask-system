<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Task;

class TaskController extends Controller
{

        public function getTasksForUser(Request $request)
        {
            $userId = auth()->id();

            $tasks = Task::with(['assignedUser', 'team'])
                        ->assignedTo($userId)
                        ->orderBy('due_date')
                        ->paginate(10);

            return response()->json($tasks);
        }
}
