const express = require('express');
const route = express.Router();
const alunoController = require("./controllers/AlunoController")
const cors = require('cors')
const turmaController = require("./controllers/turmaController")

route.options("*",cors())

//End points - Aluno
route.get('/aluno',alunoController.readyAlunos)//Ready
route.get('/aluno/:codigo',alunoController.readyAlunosByCurso)//Ready
route.post('/aluno',alunoController.createAluno)//Create
route.put('/aluno/:codigo',alunoController.updateAluno)//Update
route.delete('/aluno/:codigo',alunoController.deleteAluno)//Delete

//End points - Turma
route.get('/turma',turmaController.readyTurma)
route.get('/turma/:codigo',turmaController.readyTurmaByCurso)
route.post('/turma',turmaController.createTurma)
route.put('/turma/:codigo',turmaController.updateTurma)
route.delete('/turma/:codigo',turmaController.deleteTurma)


module.exports = route;