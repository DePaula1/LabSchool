
const alunoService = require("../services/AlunoService");
const turmaService = require("../services/turmaService");

module.exports = {
    readyAlunos: async (req,res) => {
        let json = {error:"",result:[]};

        let alunos = await alunoService.searchAlunos();
        
        for(let i in alunos){
            json.result.push({
                id: alunos[i].id,
                nome: alunos[i].nome,
                telefone: alunos[i].telefone,
                dt_nascimento: alunos[i].dt_nascimento,
                endereco: alunos[i].endereco
            })
        }
        res.header("Access-Control-Allow-Origin", "*")

        if(json.result.length == 0){
            res.status(200).json({
                message: "Nenhuma instancia de alunos cadastrada" 
            })
        }else{
            res.status(200).json(json)
        }

        
    },
    readyAlunosByCurso: async(req,res)=>{
    let json = {error:"",result:[]};

    let id = req.params.codigo

    let alunos = await alunoService.getAlunosByCurso(id);
    
    for(let i in alunos){
        json.result.push({
            id: alunos[i].id,
            nome: alunos[i].nome,
            telefone: alunos[i].telefone,
            dt_nascimento: alunos[i].dt_nascimento,
            endereco: alunos[i].endereco
        })
    }
        res.header("Access-Control-Allow-Origin", "*")

        if(json.result.length == 0){
            res.status(200).json({
                message: "Nenhuma instancia de alunos cadastrada" 
            })
        }else{
            res.status(200).json(json)
        }
    

    },

    createAluno: async(req,res)=>{

        let json={error:"" ,result:{}}

        let nome = req.body.nome
        let telefone = req.body.telefone
        let data = req.body.data
        let endereco = req.body.endereco
        let turma = req.body.turma

        if(nome && telefone && data && endereco && turma){

            let resultTurma = await turmaService.searchTurmaById(turma)

            console.log(resultTurma)

            if(resultTurma == 0){
                json.error = "Turma não encontrada!"
                res.header("Access-Control-Allow-Origin", "*")
                res.status(400).json(json)
            }else{
                let aluno = await alunoService.createAluno(
                    nome,
                    telefone,
                    data,
                    endereco,
                    turma
                )
                
                await turmaService.addAlunos(turma)
    
                json.result = {
                    id : aluno.insertId,
                    nome,
                    telefone,
                    data,
                    endereco,
                    turma
                }
                res.header("Access-Control-Allow-Origin", "*")
                res.status(201).json(json)
            }

        }else{
            json.error = "Incomplete fields"
            res.header("Access-Control-Allow-Origin", "*")
            res.status(400).json(json)
        }
    },

    updateAluno: async (req,res)=>{

        let json = {error:"",result:{}}

        let id = req.params.codigo
        let nome = req.body.nome
        let telefone = req.body.telefone
        let data = req.body.data
        let endereco = req.body.endereco
        
        if(id){
            let aluno = await alunoService.getAlunoByID(id)
            if(!aluno.length == 0){
                json.error = "Aluno não encontrado"
                res.header("Access-Control-Allow-Origin", "*")
                res.status(400).json(json)
            }else{
                await alunoService.updateAluno(id,nome,telefone,data,endereco)
                json.result = {id,nome,telefone,data,endereco}

                res.header("Access-Control-Allow-Origin", "*")
                res.status(200).json(json)
            }
            
        }else{
            json.error = "Error ID!"
            res.header("Access-Control-Allow-Origin", "*")
            res.status(400).json(json)
        }
        
    },

    deleteAluno: async(req,res)=>{

        let json = {error:"",result:""}

        let id = req.params.codigo
        

        if(id){

            let aluno = await alunoService.getAlunoByID(id)

            if(aluno == 0){
                
                json.error = "Aluno não encontrado"
                res.header("Access-Control-Allow-Origin", "*")
                res.status(400).json(json)

            }else{
                await alunoService.deleteAluno(id)
                await turmaService.delAlunos(aluno[0].fk_turma)
                json.result = `Aluno deleted successfully ID: ${id}`

                res.header("Access-Control-Allow-Origin", "*")
                res.status(200).json(json)
            }
            
        }else{
            json.error = "Error ID!"
            res.header("Access-Control-Allow-Origin", "*")
            res.json(json)
        }

    }
}