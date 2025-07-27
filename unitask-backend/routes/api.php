<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;

Route::get('/ping', function () {
    return response()->json(['pong' => true]);
});

Route::get('/', function () {
    return response()->json([
        ['id' => 1, 'titulo' => 'Revisar orçamento', 'concluida' => false],
        ['id' => 2, 'titulo' => 'Enviar relatório', 'concluida' => true],
        ['id' => 3, 'titulo' => 'Agendar reunião', 'concluida' => false],
    ]);
});

Route::get('/tarefas', function () {
    return response()->json([
        ['id' => 1, 'titulo' => 'Revisar orçamento', 'concluida' => false],
        ['id' => 2, 'titulo' => 'Enviar relatório', 'concluida' => true],
        ['id' => 3, 'titulo' => 'Agendar reunião', 'concluida' => false],
    ]);
});

Route::post('/login', [AuthController::class, 'login']);

Route::get('/home', [TaskController::class, 'getTaskforUser']);
