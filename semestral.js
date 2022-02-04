let peso1 = 2
let peso2 = 3

let notamax = 100
let media_necessaria = 60 
let soma_pesos = peso1 + peso2
let score_necessaria_total = media_necessaria * soma_pesos


let score1
let score2
let score3

let media
let sit
let msg

let mediaNormal = () => Math.round(((score1 * peso1) + (score2 * peso2)) / soma_pesos)
let cursou1 = () => Math.round(((score1 * peso1) + (0 * peso2)) / soma_pesos)

let necessaria = () => Math.round((score_necessaria_total - ((score1 * peso1))) / peso2);

function calculoSemestral() {
    const createtags = document.getElementById('text')
    score1 = parseFloat(document.getElementById('input1').value)  
    score2 = parseFloat(document.getElementById('input2').value)   
    score3 = parseFloat(document.getElementById('input3').value)

    let arr = [score1, score2, score3]
    for (let pos in arr){
        if(arr[pos] > 100 || arr[pos] < 0){
            createtags.innerHTML='<h1 class="invalid">Notas Inválidas</h1>'
            return
        }
    }

    const calculocompleto = !isNaN(score1) && !isNaN(score2) && !isNaN(score3)
    const calculonormal =  !isNaN(score1) && !isNaN(score2)
    const incompleto = !isNaN(score1)

    if(calculocompleto){media = media_final(); result(3)}

    else if (calculonormal){media = mediaNormal(); result(2)}

    else if(incompleto){media = cursou1(); result(1)}
    
    else{
        createtags.innerHTML='<h1 class="invalid">Notas Inválidas</h1>'
        return
    }

    createtags.innerHTML= `
    <h1>Resultado: </h1>
    <h2 class='inline'>Situação: </h2>
    <p class='inline' id = 'sit'>${sit}</p>

    <p class='inline'><strong>Média: </strong></p>
    <p class='inline'>${media}</p>
    <p>${msg}</p>` 

}

function result(cursou){
    aprovado = media >= media_necessaria
    cursando = media < media_necessaria && cursou === 1
    final = media >= (media_necessaria - (notamax - media_necessaria)) && media < media_necessaria && cursou === 2

    if (aprovado){
        sit = 'Aprovado'
        msg = 'Parabéns, você está aprovado! :)'
    }

    else if(cursando){
        sit = 'Cursando'
        msg = `Você precisa de ${necessaria()} no 2º Bimestre para ser aprovado`
        
    }

    else if(final){
        sit = 'Prova Final'
        msg = `Você precisa de ${score_min()} na prova final para ser aprovado`
    }

    else {
        sit = 'Reprovado'
        msg = 'Você está reprovado :('
    }

}

function media_final(){
    let simple_score = ((((score1 * peso1) + (score2 * peso2)) / soma_pesos) + score3) / 2
    let scoreSub1 = ((score3 * peso1) + (score2 * peso2)) / soma_pesos
    let scoreSub2 = ((score1 * peso1) + (score3 * peso2)) / soma_pesos

    return Math.round(Math.max(...[simple_score, scoreSub1, scoreSub2]))
}

function score_min(){
    let simple_score = (media_necessaria * 2) - media
    let scoreSub1 = (score_necessaria_total - ((score2 * peso2))) / peso1
    let scoreSub2 = (score_necessaria_total - ((score1 * peso1))) / peso2

    return Math.round(Math.min(...[simple_score, scoreSub1, scoreSub2]))

}