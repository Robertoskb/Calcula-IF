var peso1 = 2
var peso2 = 2
var peso3 = 3
var peso4 = 3

var media_necessaria = 60
var soma_pesos = peso1+peso2+peso3+peso4
var score_necessario = media_necessaria * soma_pesos

function calculate(){
    const createtags = document.getElementById('text')


    var score1 = parseInt(document.getElementById('input1').value)
    var score2 = parseInt(document.getElementById('input2').value)
    var score3 = parseInt(document.getElementById('input3').value)
    var score4 = parseInt(document.getElementById('input4').value)
    var score5 = parseInt(document.getElementById('input5').value)
    
    

    var scores = [score1, score2, score3, score4]

    scores.every( score =>{if(isNaN(score) || score < 0 || score > 100 || score5 > 100 || score5 < 0){
           createtags.innerHTML = '<h1>Notas Inválidas</h1>'
           return false
        }
    
         
    else if (isNaN(score5)){ 
        createtags.innerHTML = no_final_test(score1, score2, score3, score4, score5)

        }

    else {
        createtags.innerHTML = final_test(score1, score2, score3, score4, score5)


    }
    })
   
    
}

function no_final_test(score1, score2, score3, score4){
    
    var media = Math.round((peso1*score1 + peso2*score2 + peso3*score3 + peso4*score4)/10)

    var sit = ''
    var msg = ''

    if(media >= media_necessaria){
        sit = 'Aprovado'
        msg = 'Parabéns, Você está aprovado!'
    }

    else if (media >= 20 && media < media_necessaria){
        sit = 'Prova Final'
        var min = Math.round(score_min(media, score1, score2, score3, score4))
        
        msg = `Você precisa de ${min} na Prova Final`
    }

    else {
        sit = 'Reprovado'
        msg = 'Você está reprovado :('
    }

    return `<h1>Resultado: </h1>

    <h2 class='inline'>Situação: </h2>
    <p class='inline' id = 'sit'>${sit}</p>

    <strong class='inline'>Média: </strong>
    <p class='inline'>${media}</p>
    <p>${msg}</p>`
    
}

function final_test(score1, score2, score3, score4, score5){
    var media = 0
    var msg = ''
    var sit = ''


    var simple_score = Math.round(((((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4)) / soma_pesos) + score5) / 2)


    var scoreSub1 = Math.round(((score5 * peso1) + (score2 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos)

    var scoreSub2 = Math.round(((score1 * peso1) + (score5 * peso2) + (score3 * peso3) + (score4 * peso4))/soma_pesos)

    var scoreSub3 = Math.round(((score1 * peso1) + (score2 * peso2) + (score5 * peso3) + (score4 * peso4))/soma_pesos)

    var scoreSub4 = Math.round(((score1 * peso1) + (score2 * peso2) + (score3 * peso3) + (score5 * peso4))/soma_pesos)


    if (simple_score >= scoreSub1 && simple_score >= scoreSub2 && simple_score >= scoreSub3 && simple_score >= scoreSub4){
        media = simple_score
    }

    else if (scoreSub1 >= simple_score && scoreSub1 >= scoreSub2 && scoreSub1 >= scoreSub3 && scoreSub1 >= scoreSub4){
        media = scoreSub1
    }

    else if (scoreSub2 >= simple_score && scoreSub2 >= scoreSub3 && scoreSub2 >= scoreSub4 && scoreSub2 >= scoreSub1){
        media = scoreSub2
    }

    else if (scoreSub3 >= simple_score && scoreSub3 >= scoreSub4 && scoreSub3 >= scoreSub1 && scoreSub3 >= scoreSub2){
        media = scoreSub3
    }

    else {
        media = scoreSub4
    }


    if (media >= media_necessaria){
        sit = 'Aprovado'
        msg = 'Parabens, Você está aprovado!'
    }

    else{
        sit = 'Reprovado'
        msg ='Você está reprovado :('
    }

    return `<h1>Resultado: </h1>
        
    <h2 class='inline'>Situação: </h2>
    <p class='inline' id = 'sit'>${sit}</p>

    <strong class='inline'>Média: </strong>
    <p class='inline'>${media}</p>
    <p>${msg}</p>`
}



function score_min(media, score1, score2, score3, score4){
    var simple_score = (media_necessaria * 2) - media

    var scoreSub1 = (score_necessario - ((score2*peso2) + (score3*peso3) + (score4*peso4))) /peso1

    var scoreSub2 =  (score_necessario - ((score1*peso1) + (score3*peso3) + (score4*peso4)))/peso2

    var scoreSub3 =  (score_necessario - ((score1*peso1) + (score2*peso2) + (score4*peso4)))/peso3

    var scoreSub4 =  (score_necessario  - ((score1*peso1) + (score2*peso2) + (score3*peso3)))/peso4

    if(simple_score <= scoreSub1 && simple_score <= scoreSub2 && simple_score <= scoreSub3 && simple_score <= scoreSub4) {
        return simple_score  

    }

    else if (scoreSub1 <= scoreSub2 && scoreSub1 <= scoreSub3 && scoreSub4 && scoreSub1 <= simple_score){
        return scoreSub1 
    }

    else if (scoreSub2 <= scoreSub1 && scoreSub2 <= scoreSub3 && scoreSub2 <= scoreSub4 && scoreSub2 <= simple_score){
        return scoreSub2 
    }

    else if (scoreSub3 <= scoreSub1 && scoreSub3 <= scoreSub2 && scoreSub3 <= scoreSub4 && scoreSub3 <= simple_score){
        return scoreSub3 
    }

    else {
        return scoreSub4 
    }
    
}