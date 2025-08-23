<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $table = 'members';

    // protected $fillable = ['name'];

    private function getUser(){}

    /**
     * 
     */
    public function getAllMembers(){

        $mockData = [
            'membros' => [
                [
                'id' => 1,
                    'nome' => "Gabriel Gomes",
                    'user' => "@imgabrielmendes",
                    'posicao' => "TechLeader",
                    'time' => "Equipe 1",
                ],
                [
                'id' => 2,
                    'nome' => "Lucas Gomes",
                    'user' => "@lucasgomes",
                    'posicao' => "Sub-Lider",
                    'time' => "Equipe 2",
                ]
            ]
        ];

        $membros = $mockData['membros'];

        $formattedMembers = array_map(function ($membro) {
            return [
                'nome' => $membro['nome'],
                'user' => $membro['user'],
                'posicao' => $membro['posicao'],
                'time' => $membro['time'],
                'done' => false
            ];
        }, $membros);

        return response()->json($formattedMembers);


    }

}
