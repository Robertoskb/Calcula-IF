let peso1 = 2
let peso2 = 2
let peso3 = 3
let peso4 = 3

let media_necessaria = 60
let soma_pesos = peso1+peso2+peso3+peso4
let score_necessario = media_necessaria * soma_pesos

function calculate(){
    
    const createtags = document.getElementById('text')

    var score1 = parseFloat(document.getElementById('input1').value)
    if (isNaN(score1) || score1 < 0 || score1 > 100){createtags.innerHTML='<h1>Notas Invalidas</h1>'; return}
    var score2 = parseFloat(document.getElementById('input2').value)
    if (isNaN(score2) || score2 < 0 || score2 > 100){createtags.innerHTML='<h1>Notas Invalidas</h1>'; return}
    var score3 = parseFloat(document.getElementById('input3').value)
    if (isNaN(score3) || score3 < 0 || score3 > 100){createtags.innerHTML='<h1>Notas Invalidas</h1>'; return}
    var score4 = parseFloat(document.getElementById('input4').value)
    if (isNaN(score4) || score4 < 0 || score4 > 100){createtags.innerHTML='<h1>Notas Invalidas</h1>'; return}
    var score5 = parseFloat(document.getElementById('input5').value)
    if (score5 < 0 || score5 > 100){createtags.innerHTML='<h1>Notas Invalidas</h1>'; return} 

    if (isNaN(score5)){ 
        createtags.innerHTML = no_final_test(score1, score2, score3, score4, score5)

        }

    else {
        createtags.innerHTML = final_test(score1, score2, score3, score4, score5)
       
    }
   
    
}

function no_final_test(score1, score2, score3, score4){
    
    let media = media1(score1, score2, score3, score4)
    let resultado = result(media, false, score1, score2, score3, score4)
    let sit = resultado.sit
    let msg = resultado.msg

    
    return `<h1>Resultado: </h1>

    <h2 class='inline'>Situação: </h2>
    <p class='inline' id = 'sit'>${sit}</p>

    <strong class='inline'>Média: </strong>
    <p class='inline'>${media}</p>
    <p>${msg}</p>`
    
}


function media1(score1, score2, score3, score4){
    return  Math.round((peso1*score1 + peso2*score2 + peso3*score3 + peso4*score4)/10)

}

function result(media, provafinal = false, score1, score2, score3, score4){
    let sit = ''
    let msg = ''

    let min = Math.round(score_min(media, score1, score2, score3, score4))

    if(media >= media_necessaria){
        sit = 'Aprovado'
        msg = 'Parabéns, Você está aprovado!'
    }

    else if (media >= 20 && media < media_necessaria && provafinal === false) {
        sit = 'Prova Final'
        msg = `Você precisa de ${min} na Prova Final`
    }

    else {
        sit = 'Reprovado'
        msg = 'Você está reprovado :('
    }

    return{sit, msg}

}
function final_test(score1, score2, score3, score4, score5){
    let media = media2(score1, score2, score3, score4, score5)
    let resultado = result(media, true, score1, score2, score3, score4)

    let msg = resultado.msg
    let sit = resultado.sit

    return `<h1>Resultado: </h1>
        
    <h2 class='inline'>Situação: </h2>
    <p class='inline' id = 'sit'>${sit}</p>

    <strong class='inline'>Média: </strong>
    <p class='inline'>${media}</p>
    <p>${msg}</p>`
}


function media2(score1, score2, score3, score4, score5){
    let simple_score = Math.round(((((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4)) / soma_pesos) + score5) / 2)

    let scoreSub1 = Math.round(((score5 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos)

    let scoreSub2 = Math.round(((score1 * peso1) + (score5 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos)

    let scoreSub3 = Math.round(((score1 * peso1) + (score2 * peso2) + (score5 * peso3) + (score4 * peso4))/soma_pesos)

    let scoreSub4 = Math.round(((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score5 * peso4))/soma_pesos)

    let arr = [simple_score, scoreSub1, scoreSub2, scoreSub3, scoreSub4]

    return Math.max(...arr)

}

function score_min(media, score1, score2, score3, score4){
    let simple_score = (media_necessaria * 2) - media

    let scoreSub1 = (score_necessario - ((score2*peso2) + (score3*peso3) + (score4*peso4))) /peso1

    let scoreSub2 =  (score_necessario - ((score1*peso1) + (score3*peso3) + (score4*peso4)))/peso2

    let scoreSub3 =  (score_necessario - ((score1*peso1) + (score2*peso2) + (score4*peso4)))/peso3

    let scoreSub4 =  (score_necessario  - ((score1*peso1) + (score2*peso2) + (score3*peso3)))/peso4

    let arr = [simple_score, scoreSub1, scoreSub2, scoreSub3, scoreSub4]

    return Math.min(...arr)
    
}