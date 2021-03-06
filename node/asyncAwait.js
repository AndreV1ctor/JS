const http = require('http')

const { reject, get } = require('lodash')
const { resolve } = require('path')

const getTurma = letra => {
    const url = `http://files.cod3r.com.br/curso-js/turma${letra}.json`
    return new Promise((resolve, reject) => {
        http.get(url, res => {
            let resultado = '';
    
            res.on('data', dados => {
                resultado += dados
            })
    
            res.on('end', () => {
                try{
                    resolve(JSON.parse(resultado))
                } catch(e){
                    reject(e)
                }
            })
        })
    })
}

// Recurso ES8, simplificar o uso de promises...
let obeterAlunos = async () => {
    const turmaA = await getTurma('A')
    const turmaB = await getTurma('B')
    const turmaC = await getTurma('C')
    return [].concat(turmaA,turmaB, turmaC)
}// retorna um objeto AsynFunction

obeterAlunos()
    .then(alunos => alunos.map(a => a.nomes))
    .then(nomes => console.log(nomes))