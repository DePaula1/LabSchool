const AlunoService = require("../services/AlunoService");
const turmaService = require("../services/turmaService")
module.exports = {
    readyTurma:async(req,res)=>{
        let json = {error:"",result:[]};

        let turma = await turmaService.searchTurma();

        for(let i in turma){
            json.result.push({
                id:turma[i].id,
                nome:turma[i].nome,
                descricao:turma[i].descricao,
                quantidade_alunos:turma[i].quantidade_alunos
            })
        }
        res.header("Access-Control-Allow-Origin","*")
        res.json(json)
    },
    readyTurmaByCurso:async(req,res)=>{
        let json = {error:"",result:[]};

        let turma = await turmaService.getTurmaByCurso();

        for(let i in turma){
            json.result.push({
                id:turma[i].id,
                nome:turma[i].nome,
                descricao:turma[i].descricao,
                quantidade_alunos:turma[i].quantidade_alunos
            })
        }
        res.header("Access-Control-Allow-Origin","*")
        res.json(json)
    },
    createTurma:async(req,res)=>{
        let json={error:"",result:{}}

        let nome = req.body.nome
        let descricao = req.body.descricao
        let quantidade_alunos = req.body.quantidade_alunos

        if(nome && descricao && quantidade_alunos>=0){
            let turma = await turmaService.createTurma(
                nome,
                descricao,
                quantidade_alunos
            )
            json.result = {
                id:turma.insertId,
                nome,
                descricao,
                quantidade_alunos
            }
        }else{
            json.error = "incomplete fields"
        }
        res.header("Access-Control-Allow-Origin","*")
        res.json(json)
    },

    updateTurma:async(req,res)=>{

        let json = {error:"",result: {}}

        let id = req.params.codigo
        let nome = req.body.nome
        let descricao = req.body.descricao
        let quantidade_alunos = req.body.quantidade_alunos

        if(id){
            await turmaService.updateTurma(id,nome,descricao,quantidade_alunos)

            json.result = {id,nome,descricao,quantidade_alunos}
        }else{
            json.error = "Error ID!"
        }
        res.header("Access-Control-Allow-Origin","*")
        res.json(json)
    },

    deleteTurma: async(req,res)=>{

        let json = {error: "",result:""}

        let id = req.params.codigo

        if(id){

            await turmaService.deleteTurma(id)

            let turma = await turmaService.searchTurmaById(id)

            if(turma == 0){
                json.error = "Turma não encontrada"
                res.header("Access-Control-Allow-Origin")
                res.status(400).json(json)
            }else{
            
                await turmaService.deleteTurma(id)
                json.result = `Turma deleted successfully ID: ${id}`
                
                res.header("Access-Control-Allow-Origin")
                res.status(200).json(json)
            }
            
        }else{
            json.error = "Error ID!"
            res.header("Access-Control-Allow-Origin","*")
            res.json(json)
        }
       
    }

}