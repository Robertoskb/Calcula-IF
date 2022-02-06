// Valores importates para o calculo da media do aluno
const peso1 = 2
const peso2 = 2
const peso3 = 3 
const peso4 = 3
const notamax = 100
const media_necessaria = 60
const soma_pesos = peso1+peso2+peso3+peso4 
const score_necessario_total = media_necessaria * soma_pesos

let sit
let msg
let color
let media

const createtags = document.getElementById('text')

function calculoAnual(){
    
    score1 = parseFloat(document.getElementById('input1').value)  
    score2 = parseFloat(document.getElementById('input2').value)   
    score3 = parseFloat(document.getElementById('input3').value)
    score4 = parseFloat(document.getElementById('input4').value)  
    score5 = parseFloat(document.getElementById('input5').value)

    //verifca se as notas são válidas 

    let arr = [score1, score2, score3, score4, score5]
    for (let pos in arr){
        if(arr[pos] > 100 || arr[pos] < 0){
            logResultParagraph(true)
            return
        }
    }

    const calculocompleto = 
    !isNaN(score1) && !isNaN(score2) && !isNaN(score3) && !isNaN(score4) && !isNaN(score5)

    const calculonormal = 
    !isNaN(score1) && !isNaN(score2) && !isNaN(score3) && !isNaN(score4)

    const incompleto1 =
    !isNaN(score1) && !isNaN(score2) && !isNaN(score3)

    const incompleto2 =
    !isNaN(score1) && !isNaN(score2)
    
    calculate(calculocompleto, calculonormal, incompleto1, incompleto2)
    
    
}


function calculate(calculocompleto, calculonormal, incompleto1, incompleto2){
    if (calculocompleto){
        media = media_final()
        result(5)
        logResultParagraph()   

        return
    }

    if(calculonormal){
        media = mediaNormal()
        result(4)
        logResultParagraph()
    
        return
    }

    if(incompleto1){
        media = cursou3()
        result(3)
        logResultParagraph()
    
        return
    }

    if(incompleto2){
        media = cursou2()
        result(2)
        logResultParagraph()
       
        return
    }

    else{
        logResultParagraph(true)
    }

}

function logResultParagraph(invalid = false, ){
    if (!invalid){
        createtags.innerHTML= `
        <div class='x' onclick='getoutResult()'>x</div>
        <h1  style='background-color:${color};' class='result'>Resultado: </h1>
        <h2 class='inline'>Situação: </h2>
        <p class='inline' id = 'sit'>${sit}</p>

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
    //retorna a situação do aluno e uma mensagem
    const aprovado = media >= media_necessaria
    const final = media >= (media_necessaria - (notamax - media_necessaria)) && media < media_necessaria && cursou === 4
    const cursando = media < media_necessaria && cursou < 4

    getResultMessage(aprovado, final, cursando, cursou)

}

function getResultMessage(aprovado, final, cursando, cursou){
    if(aprovado){
        sit = 'Aprovado'
        msg = 'Parabéns, Você está aprovado! :)'
        color = 'rgb(24, 155, 24)'

        return
    }
    
    if (final) {
        sit = 'Prova Final'
        msg = `Você precisa de ${score_min()} na prova final para ser aprovado`
        color = 'yellow'
        return
    }

    if (cursando) {
        sit = 'Cursando'
        msg = (cursou === 3) 
        ?`Você precisa de ${necessaria1()} no 4º Bimestre para ser aprovado` 
        :`Você precisa de ${necessaria2()} no 3º e 4º Bimestre para ser aprovado`
        color = 'rgb(24, 155, 24)'
        return
    }

    else {
        sit = 'Reprovado'
        msg = 'Você está reprovado :('
        color = 'rgb(173, 23, 23)'
    }

}

function media_final(){ 
    //calcula a nota do aluno com a prova final, são 5 formulas, a que tiver o maior resultado será retornada
    let simplescore = ((((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4)) / soma_pesos) + score5) / 2
    let scoreSub1 = ((score5 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos
    let scoreSub2 = ((score1 * peso1) + (score5 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos
    let scoreSub3 = ((score1 * peso1) + (score2 * peso2) + (score5 * peso3) + (score4 * peso4))/soma_pesos
    let scoreSub4 = ((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score5 * peso4))/soma_pesos

    return Math.round(Math.max(...[simplescore, scoreSub1, scoreSub2, scoreSub3, scoreSub4]))
}

function score_min(){
    //calcula a nota necessaria na prova final, são 5 formulas, a que tiver o menor resultado será retornada
    let simple_score = (media_necessaria * 2) - media
    let scoreSub1 =  (score_necessario_total - ((score2*peso2) + (score3*peso3) + (score4*peso4)))/peso1
    let scoreSub2 =  (score_necessario_total - ((score1*peso1) + (score3*peso3) + (score4*peso4)))/peso2
    let scoreSub3 =  (score_necessario_total - ((score1*peso1) + (score2*peso2) + (score4*peso4)))/peso3
    let scoreSub4 =  (score_necessario_total - ((score1*peso1) + (score2*peso2) + (score3*peso3)))/peso4

    return Math.round(Math.min(...[simple_score, scoreSub1, scoreSub2, scoreSub3, scoreSub4])) 
}

const mediaNormal = () => Math.round(((peso1 * score1) + (peso2 * score2) + (peso3 * score3) + (peso4 * score4)) / soma_pesos)

const cursou3 = () => Math.round(((peso1 * score1) + (peso2 * score2) + (peso3 * score3) + (peso4 * 0)) / soma_pesos)
const cursou2 = () =>  Math.round(((peso1 * score1) + (peso2 * score2) + (peso3 * 0) + (peso4 * 0)) / soma_pesos)

const necessaria1 = () => Math.round((score_necessario_total - ((score1 * peso1) + (score2 * peso2) + (score3 * peso3))) / peso4)
const necessaria2 = () => Math.round((score_necessario_total - ((score1 * peso1) + (score2 * peso2))) / (peso3 + peso4))
