/** Jogo */
function Jogo() {
    this.jogadores = new Jogadores(2);
    this.tabuleiro = new Tabuleiro(3, 3);
    this.estado = new Estado();
    this.tabuleiro.pai = this;
    this.jogadores.pai = this;
    this.estado.pai = this;
    this.iniciar();
    return this;
}

Jogo.prototype.iniciar = function () {
    console.log("iniciar");
    var elem = document.getElementById("jogo");
    if (elem) {
        elem.remove();
    }
    elem = document.createElement("DIV");
    elem.classList.add("jogo");
    var controles = this.controles();
    elem.appendChild(controles);
    document.body.appendChild(elem);
};

Jogo.prototype.controles = function () {
    var controles = document.createElement("DIV");
    controles.classList.add("controles");
    var controle;
    var v = 5;
    for (var x = 0; x < this.tabuleiro.dimensoes.x; x++) {
        for (var y = 0; y < this.tabuleiro.dimensoes.y; y++) {
            controle = document.createElement("BUTTON");
            controle.classList.add("botao");
            controle.setAttribute("data-x", x);
            controle.setAttribute("data-y", y);
            controle.setAttribute("data-v", v);
            controle.addEventListener("click", function (e) {
                e.preventDefault();
                var x = Number(this.getAttribute("data-x"));
                var y = Number(this.getAttribute("data-y"));
                var v = Number(this.getAttribute("data-v"));
                jogo.tabuleiro.alterar(x, y, v);
                console.log("cliquei",x,y,v);
            });
            controles.appendChild(controle);
        }
    }
    return controles;
};

Jogo.prototype.reiniciar = function () {

};

/** Jogadores */
/**
 * Objeto dos jogadores
 * @returns {Jogadores}
 */
function Jogadores(limite) {
    this.lista = [];
    this.limite = limite || 2;
    this.iniciar(limite);
    return this;
}

/**
 * Adiciona um jogador ao jogo
 * @param {Object} object 
 * @returns {Jogadores}
 */
Jogadores.prototype.adicionar = function (object, callback) {
    if (this.lista.length < this.limite) {
        var jogador = new Jogador(object);
        this.lista.push(jogador);
        callback(true);
    } else {
        callback(false);
    }
    return this;
};

Jogadores.prototype.iniciar = function (limite) {

};

// Jogadores.prototype.novoLimite = function (limite) {
//     this.limite = limite;
//     return this;
// };

/**
 * Reinicia os jogadores
 * @returns {Jogadores}
 */
Jogadores.prototype.reiniciar = function () {
    this.lista = [];
    return this;
};

/** Jogador */

/**
 * Objeto do jogador
 * @param {Object} object 
 */
function Jogador(object) {
    var aleatorio = Aleatorio(10);
    this.nome = object ? object.nome : aleatorio;
    return this;
}

/** Tabuleiro */

/**
 * 
 * @param {Number} eixoX 
 * @param {Number} eixoY 
 * @returns {Tabuleiro}
 */
function Tabuleiro(eixoX, eixoY) {
    this.posicoes = this.gerar(eixoX, eixoY, 0);
    this.dimensoes = {
        x: eixoX,
        y: eixoY
    };
    return this;
}

/**
 * 
 * @param {Number} eixoX 
 * @param {Number} eixoY 
 * @param {Number} valorPadrao 
 * @returns {Tabuleiro}
 */
Tabuleiro.prototype.gerar = function (eixoX, eixoY, valor) {
    var posicoes = [];
    var posicao;
    for (var x = 0; x < eixoX; x++) {
        posicao = [];
        for (var y = 0; y < eixoY; y++) {
            posicao.push(valor);
        }
        posicoes.push(posicao);
    }
    return posicoes;
};


Tabuleiro.prototype.reiniciar = function () {
    var dimensoes = this.dimensoes;
    this.posicoes = this.gerar(dimensoes.x, dimensoes.y);
    return this;
};

// Tabuleiro.prototype.novoTabuleiro = function (eixoX, eixoY, valor) {
//     this.dimensoes = { x: eixoX, y: eixoY };
//     this.tabuleiro = new Tabuleiro(dimensoes.x, dimensoes.y, valor);
//     this.posicoes = this.gerar(eixoX, eixoY);
//     return this;
// };

Tabuleiro.prototype.alterar = function (x, y, valor) {
    this.posicoes[x][y] = valor;
    return this;
};

Tabuleiro.prototype.tamanho = function () {
    return this.dimensoes.x * this.dimensoes.y;
};

/** Estado */

function Estado() {
    this.iniciar();
    return this;
}

Estado.prototype.iniciar = function () {

};

Estado.prototype.proximo = function () {

};

/** Utilidades */

/**
 * 
 * @param {Number} tamanho 
 * @returns {String}
 */
function Aleatorio(tamanho) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < tamanho; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

var jogo = new Jogo();
console.log(jogo);