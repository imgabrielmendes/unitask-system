<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

use App\Models\Task;

use Illuminate\Http\Request;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/tasks/me', [TaskController::class, 'getTasksForUser']);

Route::get('/taksforuser/{id}', [Task::class, 'getTaskforIdUser']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // aqui você pode colocar outras rotas protegidas, tipo:
    // Route::apiResource('tasks', TaskController::class);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
