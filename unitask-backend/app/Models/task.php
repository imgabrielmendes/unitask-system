<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'team_id',
        'assigned_user_id',
        'status',
        'due_date',
    ];

public static function getTaskforIdUser($userId)
{
    return self::where('assigned_user_id', $userId)->get();
}

/**
 * Método responsável por retornar as tarefas envolvendo um team que o usuário está inserido
 *
 * @param Request $request
 * @return void
 */
public static function getTaskForTeam(Request $request): JsonResponse
    {

        $mockData = [
            'tarefas' => [
                ['id' => 101, 
                    'nome' => 'Analisar relatório',
                    'team' => 'Time1'
                ],
                ['id' => 102, 
                    'nome' => 'Preparar apresentação',
                    'team' => 'Time2'
                ],
                ['id' => 103, 
                    'nome' => 'Corrigir bug na tela de login',
                    'team' => 'Time3'
                ]
            ]
        ];

        $tarefas = $mockData['tarefas'];

        $formattedTasks = array_map(function ($tarefa) {
            return [
                'label' => $tarefa['nome'],
                'team' => $tarefa['team'],
                'done' => false 
            ];
        }, $tarefas);


        return response()->json($formattedTasks);
    }
/**
 * Método privado usado para verificar as tarefas desse usuário
 *
 * @param Request $request
 * @return void
 */
private static function verifiedTasksforUser(Request $request)
{

}



}
