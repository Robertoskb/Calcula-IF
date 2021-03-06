const peso1 = 2
const peso2 = 3
const notamax = 100
const media_necessaria = 60 
const soma_pesos = peso1 + peso2
const score_necessaria_total = media_necessaria * soma_pesos

function calculoSemestral() {
    
    createtags = document.getElementById('text')
    score1 = parseFloat(document.getElementById('input1').value)  
    score2 = parseFloat(document.getElementById('input2').value)   
    score3 = parseFloat(document.getElementById('input3').value)

    let arr = [score1, score2, score3]
    for (let pos in arr){
        if(arr[pos] > 100 || arr[pos] < 0){
            logResultParagraph(undefined, undefined,undefined, undefined, true)
            return
        }
    }

    const calculocompleto = !isNaN(score1) && !isNaN(score2) && !isNaN(score3)
    const calculonormal =  !isNaN(score1) && !isNaN(score2)
    const incompleto = !isNaN(score1)

    calculate(calculocompleto, calculonormal, incompleto)

}

function calculate(calculocompleto, calculonormal, incompleto){
    var media, sit, msg, color 

    if(calculocompleto){
        media = media_final()
        sit = result(3, media).sit
        msg = result(3, media).msg
        color = result(3, media).color
        logResultParagraph(media, sit, msg, color)

        return
    }

    if (calculonormal){
        media = mediaNormal()
        sit = result(2, media).sit
        msg = result(2, media).msg
        color = result(2, media).color
        logResultParagraph(media, sit, msg, color)

        return
    }

    if(incompleto){
        media = cursou1()
        sit = result(1, media).sit
        msg = result(1, media).msg
        color = result(1, media).color
        logResultParagraph(media, sit, msg, color)

        return
    }
    
    else{
        logResultParagraph(media, sit, msg, color, true)
    }

}

function logResultParagraph(media, sit, msg, color, invalid = false){
    if (!invalid){
        createtags.innerHTML= `
        <div class='x' onclick='getoutResult()'>x</div>
        <h1 style='background-color:${color};' class='result'>Resultado: </h1>
        <h2 class='inline'>Situa????o: </h2>
        <p class='inline' id='sit'>${sit}</p>

        <p class='inline md'><strong>M??dia: </strong></p>
        <p class='inline' id='md'>${media}</p>
        <p>${msg}</p>`}
    
    else{
        createtags.innerHTML = `
        <div class='x' onclick='getoutResult()'>x</div>
        <h1 class="invalid">Notas Inv??lidas</h1>
        <p class="invalid">Verifique se voc?? preencheu os campos corretamente</p>`

    }  

}

function result(cursou, media){
    aprovado = media >= media_necessaria
    cursando = media < media_necessaria && cursou === 1
    final = media >= (media_necessaria - (notamax - media_necessaria)) && media < media_necessaria && cursou === 2

    return getResultMessage(aprovado, cursando, final, media)

}

function getResultMessage(aprovado, cursando, final, media) {
    var sit, msg, color

    if (aprovado){
        sit = 'Aprovado'
        msg = 'Parab??ns, voc?? est?? aprovado! :)'
        color = 'rgb(24, 155, 24)'
        
        return {sit, msg, color}
    }

    if(cursando){
        sit = 'Cursando'
        msg = `Voc?? precisa de ${necessaria()} no 2?? Bimestre para ser aprovado`
        color = 'rgb(24, 155, 24)'
        
        return {sit, msg, color}
    }

    if(final){
        sit = 'Prova Final'
        msg = `Voc?? precisa de ${score_min(media)} na prova final para ser aprovado`
        color = 'yellow'

        return {sit, msg, color}
    }

    else {
        sit = 'Reprovado'
        msg = 'Voc?? est?? reprovado :('
        color = 'rgb(173, 23, 23)'

        return {sit, msg, color}
    }
}

function media_final(){
    let simple_score = ((((score1 * peso1) + (score2 * peso2)) / soma_pesos) + score3) / 2
    let scoreSub1 = ((score3 * peso1) + (score2 * peso2)) / soma_pesos
    let scoreSub2 = ((score1 * peso1) + (score3 * peso2)) / soma_pesos

    return Math.round(Math.max(...[simple_score, scoreSub1, scoreSub2]))
}

function score_min(media){
    let simple_score = (media_necessaria * 2) - media
    let scoreSub1 = (score_necessaria_total - ((score2 * peso2))) / peso1
    let scoreSub2 = (score_necessaria_total - ((score1 * peso1))) / peso2

    return Math.round(Math.min(...[simple_score, scoreSub1, scoreSub2]))

}

const mediaNormal = () => Math.round(((score1 * peso1) + (score2 * peso2)) / soma_pesos)
const cursou1 = () => Math.round(((score1 * peso1) + (0 * peso2)) / soma_pesos)

const necessaria = () => Math.round((score_necessaria_total - ((score1 * peso1))) / peso2);