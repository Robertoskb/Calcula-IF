const peso1 = 2
const peso2 = 3
const notamax = 100
const media_necessaria = 60 
const soma_pesos = peso1 + peso2
const score_necessaria_total = media_necessaria * soma_pesos

let media
let sit
let msg
let color

const createtags = document.getElementById('text')

function calculoSemestral() {
    
    score1 = parseFloat(document.getElementById('input1').value)  
    score2 = parseFloat(document.getElementById('input2').value)   
    score3 = parseFloat(document.getElementById('input3').value)

    let arr = [score1, score2, score3]
    for (let pos in arr){
        if(arr[pos] > 100 || arr[pos] < 0){
            logResultParagraph(true)
            return
        }
    }

    const calculocompleto = !isNaN(score1) && !isNaN(score2) && !isNaN(score3)
    const calculonormal =  !isNaN(score1) && !isNaN(score2)
    const incompleto = !isNaN(score1)

    calculate(calculocompleto, calculonormal, incompleto)
    
 

}

function calculate(calculocompleto, calculonormal, incompleto){

    if(calculocompleto){
        media = media_final()
        result(3)
        logResultParagraph()

        return
    }

    if (calculonormal){
        media = mediaNormal()
        result(2)
        logResultParagraph()

        return
    }

    if(incompleto){
        media = cursou1()
        result(1)
        logResultParagraph()

        return
    }
    
    else{
        logResultParagraph(true)
    }

}

function logResultParagraph(invalid = false){
    if (!invalid){
        createtags.innerHTML= `
        <div class='x' onclick='getoutResult()'>x</div>
        <h1 style='background-color:${color};' class='result'>Resultado: </h1>
        <h2 class='inline'>Situação: </h2>
        <p class='inline' id='sit'>${sit}</p>

        <p class='inline md'><strong>Média: </strong></p>
        <p class='inline' id='md'>${media}</p>
        <p>${msg}</p>`}
    
    else{
        createtags.innerHTML = `
        <div class='x' onclick='getoutResult()'>x</div>
        <h1 class="invalid">Notas Inválidas</h1>
        <p class="invalid">Verifique se você preencheu os campos corretamente</p>`

    }  

}

function result(cursou){
    aprovado = media >= media_necessaria
    cursando = media < media_necessaria && cursou === 1
    final = media >= (media_necessaria - (notamax - media_necessaria)) && media < media_necessaria && cursou === 2

    getResultMessage(aprovado, cursando, final)

}

function getResultMessage(aprovado, cursando, final) {
    if (aprovado){
        sit = 'Aprovado'
        msg = 'Parabéns, você está aprovado! :)'
        color = 'rgb(24, 155, 24)'
        
        return
    }

    if(cursando){
        sit = 'Cursando'
        msg = `Você precisa de ${necessaria()} no 2º Bimestre para ser aprovado`
        color = 'rgb(24, 155, 24)'
        
        return
    }

    if(final){
        sit = 'Prova Final'
        msg = `Você precisa de ${score_min()} na prova final para ser aprovado`
        color = 'yellow'

        return
    }

    else {
        sit = 'Reprovado'
        msg = 'Você está reprovado :('
        color = 'rgb(173, 23, 23)'
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

const mediaNormal = () => Math.round(((score1 * peso1) + (score2 * peso2)) / soma_pesos)
const cursou1 = () => Math.round(((score1 * peso1) + (0 * peso2)) / soma_pesos)

const necessaria = () => Math.round((score_necessaria_total - ((score1 * peso1))) / peso2);
