<?php

use Illuminate\Support\Facades\Route;

Route::get('/ping', function () {
    return response()->json(['pong' => true]);
});

Route::get('/tarefas', function () {
    return response()->json([
        ['id' => 1, 'titulo' => 'Revisar orçamento', 'concluida' => false],
        ['id' => 2, 'titulo' => 'Enviar relatório', 'concluida' => true],
        ['id' => 3, 'titulo' => 'Agendar reunião', 'concluida' => false],
    ]);
});