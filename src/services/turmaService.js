const { query } = require('express');
const database = require('../database')

module.exports = {
    //Adicionar quantidade de alunos a uma turma
    addAlunos: (id)=>{
            return new Promise((accepted,rejected) => {
                database.query(`UPDATE turma SET quantidade_alunos = + 1 WHERE id = ${id}`),(error,result)=>{
                    if(error) {
                        rejected (error)
                        return
                    }
                    accepted (result)
                }
            }
        )
    },

    //Metodos para remover quandidade de alunos da turma
    delAlunos: (id)=>{
        return new Promise((accepted,rejected) => {
            database.query(`UPDATE turma SET quantidade_alunos = - 1 WHERE id = ${id}`),(error,result)=>{
                if(error) {
                    rejected (error)
                    return
                }
                accepted (result)
                }
            }
        )
    },

    //Metodo para pesqisar todos os alunos
    searchTurma:()=>{
        return new Promise((accepted,rejected)=>{
            database.query('SELECT * FROM turma',(error,result)=>{
                if (error) {
                    rejected(error)
                    return
                }
                    accepted(result)
            })
        })
    },

    //Metodo para pesquisar Alunos opr curso
    getTurmaByCurso:(codigo)=>{
        return new Promise((accepted, rejected) =>{
            database.query(
                `SELECT * FROM aluno WHERE fk_turma = ${codigo}`,(error,result)=>{
                    if(error){
                        rejected(error)
                        return
                    }
                    accepted(result)
                }
            )
        })
    },

    //Metodo para consultar turma pelo id
    searchTurmaById:(codigo)=>{
        return new Promise((accepted,rejected)=>{
            database.query(`SELECT * FROM turma WHERE id= ${codigo}`,(error,result)=>{
                if(error){
                    rejected(error)
                    return
                }
                accepted(result)
            })
        })

    },

    //Metodo para cadastrar uma turma
    createTurma:(nome,descricao,quantidade_alunos)=>{
        return new Promise((accepted,rejected)=>{
            database.query(
                `INSERT INTO turma(nome,descricao,quantidade_alunos)values
                ('${nome}','${descricao}','${quantidade_alunos}')`,
                (error,result)=>{
                    if(error){
                        rejected(error)
                        return
                    }
                    accepted(result)
                }
            )
        })
    },

    //Metodo para atualizar informações de uma turma
    updateTurma:(id,nome,descricao,quantidade_alunos)=>{
        return new Promise((accepted,rejected)=>{
            database.query(
                `UPDATE turma SET nome = '${nome}',descricao = '${descricao}',quantidade_alunos = '${quantidade_alunos}' WHERE id = ${id}`,
                (error,result)=>{
                    if(error){
                        rejected(error)
                        return
                    }
                    accepted(result)
                } 
            )
        })
    },

    //Metodo para Deletar uma turma
    deleteTurma:(id)=>{
        return new Promise((accepted,rejected)=>{
            database.query(
                `DELETE FROM turma WHERE id = ${id}`,(error,result)=>{
                    if(error){
                        rejected(error)
                        return
                    }
                    accepted(result)
                }
            )
        })
    }

}




