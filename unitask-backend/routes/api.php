<?php

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

use App\Models\Task;
use App\Models\Team;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/task', [Task::class, 'getTaskForTeam']);
Route::get('/members', [Team::class, 'getAllMembers']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route::apiResource('tasks', TaskController::class);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
