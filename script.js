let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    number = number * 700;
    setTimeout(() => {
        playAudio(element.classList[0], "play");
        element.classList.add('selected');
    }, number - 500);
    setTimeout(() => {
        playAudio(element.classList[0], "stop");
        element.classList.remove('selected');
    }, number);
}

//play audio
let playAudio = (className, act = "play") => {
    let audio = document.getElementById(`${className}-sound`);
    if (act === "play") {
        audio.play();
    } else {
        audio.pause();
    }
}   


//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    
    //alterar placar
    if(clickedOrder.length == order.length) {
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        messagePopup("Segue o jogo!", `Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`, 'Prosseguir', () => {
            resetPopup()
            nextLevel();
        })
    }
}

//funcao para o clique do usuario
let click = (color) => {
    let elementColor = createColorElement(color);
    clickedOrder[clickedOrder.length] = color;
    elementColor.classList.add('selected');
    playAudio(elementColor.classList[0], "play")

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        playAudio(elementColor.classList[0], "stop")
        checkOrder();
    },250);
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    changeScoreView();
    score++;
    shuffleOrder();
}

//altera o score na view
let changeScoreView = () => {
    let html = `<h2>Acertos: ${score}</h2>`;
    document.querySelector('.score').innerHTML = html;
}

//funcao para game over
let gameOver = () => {
    //alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    messagePopup("Você Perdeu!",`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`,'Fazer O quê!', () => {
        resetPopup();
        order = [];
        clickedOrder = [];

        playGame("Recomeçar");
    })
    
}



//função messages popup
let messagePopup = (title, msg, screen, callback) => {

    document.querySelector('.popup').style.display = "flex";

    let elMsgTitle = document.querySelector('.message-box .message-title h1');
    let elMsgContent = document.querySelector('.message-box .message-content');
    let elMsgFooter = document.querySelector('.message-box .message-footer');
    let btn_start = `<button class="btn">${screen}</button>`;

    elMsgTitle.innerText = title;
    elMsgContent.innerHTML = `<p>${msg}</p>`;
    elMsgFooter.innerHTML = btn_start;

    document.querySelector('.btn').addEventListener('click', callback);

}

let resetPopup = () => {
    document.querySelector('.popup').style.display = "none";
    document.querySelector('.btn').remove();
}


//funcao de inicio do jogo
let playGame = (status) => {  
    messagePopup('Bem Vindo!','Bem vindo ao Gênesis! Iniciando novo jogo!', status, () => {
        resetPopup();
        score = 0;
        nextLevel();
    });
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
playGame("Start");