//Tornando o escopo da função global
var largura = 0;
var altura = 0;
var vidas = 1;
var tempo = 15;

var criaMoscaTempo = 1500;

var nivel = window.location.search;//Recupera os parâmetros
nivel = nivel.replace('?', '')

if(nivel == 'normal'){
    //1500
    criaMoscaTempo = 1500;
} else if(nivel == 'dificil'){
    //1000
    criaMoscaTempo = 1000;
} else if(nivel == 'chucknorris'){
    //750
    criaMoscaTempo = 750;
}

function ajustaTamanhoPalcoJogo() {
    //Pegando as dimensões da tela
    altura = window.innerHeight;
    largura = window.innerWidth;
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function(){
    tempo --;

    if(tempo < 0){
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = 'vitoria.html';
    }else{
        document.getElementById('cronometro').innerHTML = tempo;
    }
},1000);

function posicaoRandomica() {

    //Remover o msoquito anterior (caso exista)
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html';
        }else{
            document.getElementById('v'+vidas).src="imagens/coracao_vazio.png";
            vidas++;
        }
    } 

    //Gerando uma posição randomica
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    //Controle de espaço
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    //Criar o elemento HTML usando o DOM
    var mosquito = document.createElement('img')

    //Passando o src da imagem do mosquito
    mosquito.src = 'imagens/mosca.png';
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        this.remove();
    }

    //inserindo a imagem no body (Lembrando que o DOM é uma arvore de elementos)
    document.body.appendChild(mosquito);

}

//Tamanho aleatório dos mosquitos
function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);

    switch (classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

//define o lado em que o Mosquita vai estar virado
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);

    switch (classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}