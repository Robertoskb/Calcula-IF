// Valores importates para o calculo da media do aluno
let peso1 = 2
let peso2 = 2
let peso3 = 3
let peso4 = 3
let media_necessaria = 60
let soma_pesos = peso1+peso2+peso3+peso4
let score_necessario = media_necessaria * soma_pesos

function calculate(){
    const createtags = document.getElementById('text')
    const score1 = parseFloat(document.getElementById('input1').value)  
    const score2 = parseFloat(document.getElementById('input2').value)   
    const score3 = parseFloat(document.getElementById('input3').value)
    const score4 = parseFloat(document.getElementById('input4').value)  
    const score5 = parseFloat(document.getElementById('input5').value)

    if (score5 < 0 || score5 > 100){createtags.innerHTML='<h1>Notas Invalidas</h1>'; return}

    /*verifca se algumas das quatro primeiras notas são invalidas, a quinta nota a quinta nota é a da prova final e pode ou não ser NaN
    */

    let arr = [score1, score2, score3, score4]
    for (let pos in arr){
        if(arr[pos] > 100 || arr[pos] < 0 || isNaN(arr[pos])){
            createtags.innerHTML='<h1>Notas Invalidas</h1>'
            return
        }
    }

    /* Se score5 não for um numero signfica que o aluno  não fez a prova final */

    createtags.innerHTML = (isNaN(score5)) 
    ? no_final_test(score1, score2, score3, score4) 
    : final_test(score1, score2, score3, score4, score5)    
}

function no_final_test(score1, score2, score3, score4){ 
    let media =  Math.round((peso1*score1 + peso2*score2 + peso3*score3 + peso4*score4)/10) //calcula a media dos quatro bimestres sem a prova final
    let resultado = result(media, false, score1, score2, score3, score4) //chama a função result que retorna a situação do aluno e uma mensagem
    let sit = resultado.sit
    let msg = resultado.msg

    return `
    <h1>Resultado: </h1>
    <h2 class='inline'>Situação: </h2>
    <p class='inline' id = 'sit'>${sit}</p>

    <strong class='inline'>Média: </strong>
    <p class='inline'>${media}</p>
    <p>${msg}</p>`    
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
    let media = media_final(score1, score2, score3, score4, score5) 
    let resultado = result(media, true, score1, score2, score3, score4)
    let msg = resultado.msg
    let sit = resultado.sit

    return `
    <h1>Resultado: </h1>    
    <h2 class='inline'>Situação: </h2>
    <p class='inline' id = 'sit'>${sit}</p>

    <strong class='inline'>Média: </strong>
    <p class='inline'>${media}</p>
    <p>${msg}</p>`
}

function media_final(score1, score2, score3, score4, score5){ 
    //calcula a nota do aluno com a prova final, são 5 formulas, a que tiver o maior resultado será retornada
    let simple_score = Math.round(((((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4)) / soma_pesos) + score5) / 2)
    let scoreSub1 = Math.round(((score5 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos)
    let scoreSub2 = Math.round(((score1 * peso1) + (score5 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos)
    let scoreSub3 = Math.round(((score1 * peso1) + (score2 * peso2) + (score5 * peso3) + (score4 * peso4))/soma_pesos)
    let scoreSub4 = Math.round(((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score5 * peso4))/soma_pesos)

    return Math.max(...[simple_score, scoreSub1, scoreSub2, scoreSub3, scoreSub4])
}

function score_min(media, score1, score2, score3, score4){
    //calcula a nota necessaria na prova final, são 5 formulas, a que tiver o menor resultado retornada
    let simple_score = (media_necessaria * 2) - media
    let scoreSub1 =  (score_necessario - ((score2*peso2) + (score3*peso3) + (score4*peso4)))/peso1
    let scoreSub2 =  (score_necessario - ((score1*peso1) + (score3*peso3) + (score4*peso4)))/peso2
    let scoreSub3 =  (score_necessario - ((score1*peso1) + (score2*peso2) + (score4*peso4)))/peso3
    let scoreSub4 =  (score_necessario - ((score1*peso1) + (score2*peso2) + (score3*peso3)))/peso4

    return Math.min(...[simple_score, scoreSub1, scoreSub2, scoreSub3, scoreSub4])    
}