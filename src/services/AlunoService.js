const database = require('../database')

module.exports ={
    //Metodo para pesquisar todos os alunos
    searchAlunos:() =>{
        return new Promise(
            (accepted,rejected)=>{
                database.query('SELECT * FROM aluno', (error,result)=>{
                    if(error)
                        {
                        rejected(error)
                        return
                    }
                        accepted(result);
                })
            }
        )
    },

//Metodo para pesquisar alunos por curso
    getAlunosByCurso: (codigo) =>{
        return new Promise((accepted,rejected) => {
            database.query(
                `SELECT * FROM aluno WHERE fk_turma = ${codigo}`,(error,result)=>{
                    if(error){
                        rejected(error)
                        return
                    }
                    accepted(result);
                }
            )
        })
    },
    
    //Metodo para pesquisar um aluno por id
    getAlunoByID:(id)=>{
        return new Promise((accepted,rejected)=>{
            database.query(`SELECT * FROM aluno WHERE id = ${id}`,(error,result)=>{
                if(error){
                    rejected(error)
                    return
                }
                accepted(result)
            })
        })
    },

    //Metodo para cadastrar um alunos
    createAluno:(nome,telefone,data,endereco,turma)=>{
        return new Promise((accepted,rejected)=>{
            database.query(
                `INSERT INTO aluno(nome,telefone,dt_nascimento,endereco,fk_turma) VALUES
                 ('${nome}','${telefone}','${data}','${endereco}',${turma})`,(error,result)=>{
                    if(error){
                        rejected(error)
                        return
                    }
                    accepted(result);
                 }
            )

        })
    },
    //Metodo para atualizar as informações do aluno
    updateAluno:(id,nome,telefone,data,endereco) =>{
        return new Promise((accepted,rejected)=>{
            database.query(
                `UPDATE aluno SET nome = '${nome}',telefone = '${telefone}',dt_nascimento = '${data}',endereco = '${endereco}' WHERE id = ${id}`,
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
    //Metodo para deletar um aluno
    deleteAluno:(id)=>{
        return new Promise((accepted,rejected)=>{
            database.query(`DELETE FROM aluno WHERE id = ${id}`,(error,result)=>{
                if(error){
                    rejected(error)
                    return
                }
                accepted(result)
            })

        })
    
    }
}


