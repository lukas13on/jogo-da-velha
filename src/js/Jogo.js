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
    var elem = document.querySelector(".jogo");
    if (elem) {
        elem.remove();
    }
    elem = document.createElement("DIV");
    elem.classList.add("jogo");
    var estatisticas = this.estatisticas();
    var controles = this.controles();
    var recomecar = this.recomecar();
    elem.appendChild(estatisticas);
    elem.appendChild(controles);
    elem.appendChild(recomecar);
    document.body.appendChild(elem);
};

Jogo.prototype.estatisticas = function () {
    var estatisticas = document.createElement("DIV");
    estatisticas.classList.add("estatisticas");
    var jogando = document.createElement("DIV");
    jogando.classList.add("jogando");
    var jogandoAgora = this.estado.jogador === 0 ? "1" : "2";
    jogando.setAttribute("id", "jogando");
    jogando.textContent = "Jogador " + jogandoAgora;
    estatisticas.appendChild(jogando);
    return estatisticas;
};

Jogo.prototype.recomecar = function () {
    var recomecar = document.createElement("DIV");
    recomecar.classList.add("recomecar");
    var botao = document.createElement("BUTTON");
    botao.classList.add("botao");
    botao.addEventListener("click", function () {
        var confirmou = confirm("Deseja reiniciar o jogo?");
        if (confirmou) {
            jogo.reiniciar();
        }
    });
    recomecar.appendChild(botao);
    return recomecar;
};

Jogo.prototype.atualizar = function () {
    var estatisticas = document.querySelector(".estatisticas");
    if (estatisticas) {
        var jogandoAgora = this.estado.jogador === 0 ? "1" : "2";
        var jogando = document.getElementById("jogando");
        jogando.textContent = "Jogador " + jogandoAgora;
    }
};

Jogo.prototype.controles = function () {
    var controles = document.createElement("DIV");
    controles.classList.add("controles");
    var controle;
    for (var x = 0; x < this.tabuleiro.dimensoes.x; x++) {
        for (var y = 0; y < this.tabuleiro.dimensoes.y; y++) {
            controle = document.createElement("BUTTON");
            controle.classList.add("botao");
            var v = this.tabuleiro.posicoes[x][y];
            controle.setAttribute("data-x", x);
            controle.setAttribute("data-y", y);
            controle.setAttribute("data-v", v);
            controle.addEventListener("click", function (e) {
                e.preventDefault();
                if (jogo.estado.terminado) {
                    return;
                }
                var botao = this;
                var x = Number(this.getAttribute("data-x"));
                var y = Number(this.getAttribute("data-y"));
                var v = Number(this.getAttribute("data-v"));
                var jogador = jogo.estado.jogador;
                switch (jogador) {
                    case 0:
                        nv = 1;
                        break;
                    case 1:
                        nv = 2;
                        break;
                }
                //jogo.tabuleiro.alterar(x, y, nv);
                jogo.tabuleiro.alterar(botao, { x: x, y: y, v: nv });
                //console.log("cliquei", x, y, nv);
            });
            controles.appendChild(controle);
        }
    }
    return controles;
};

Jogo.prototype.reiniciar = function () {
    this.jogadores = new Jogadores(2);
    this.tabuleiro = new Tabuleiro(3, 3);
    this.estado = new Estado();
    this.tabuleiro.pai = this;
    this.jogadores.pai = this;
    this.estado.pai = this;
    this.iniciar();
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

Tabuleiro.prototype.alterar = function (botao, args) {
    //console.log(args);
    this.posicoes[args.x][args.y] = args.v;
    botao.setAttribute("data-v", args.v);
    var classe = this.pai.estado.jogador === 0 ? "circulo" : "xis";
    switch (args.v) {
        case 1:
            botao.classList.add(classe);
            break;
        case 2:
            botao.classList.add(classe);
            break;
        default:
            break;
    }
    botao.setAttribute("disabled", true);
    this.pai.estado.proximo();
    return this;
};

Tabuleiro.prototype.tamanho = function () {
    return this.dimensoes.x * this.dimensoes.y;
};

/** Estado */

function Estado() {
    this.terminado = false;
    this.ganhador = false;
    this.jogador = NumeroAleatorio(0, 2);
    return this;
}

Estado.prototype.checagem = function () {
    var telemetria = Telemetria(this.pai.tabuleiro.posicoes);
    var ganhou = telemetria.ganhou;
    var velha = telemetria.velha;

    if (ganhou) {
        this.pai.estado.terminado = true;
        this.ganhador = this.jogador;
        alert("Ganhou o jogador:" + String(this.jogador));
    }

    if (velha) {
        this.pai.estado.terminado = true;
        alert("Velha");
    }

    return true;

};

Estado.prototype.proximo = function () {
    console.log("proxi8mo");
    var checado = this.checagem();
    if (checado) {
        this.jogador = this.jogador === 0 ? 1 : 0;
        this.pai.atualizar();
    }
    return this;
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

function Telemetria(pos) {

    var ganhou;
    var velha;

    var coletar = function (pos, jogador) {

        var padroes = [
            /** O O O */
            /** X X x */
            /** X X X */
            [[0, 0], [0, 1], [0, 2]],
            /** X X X */
            /** o o o */
            /** X X X */
            [[1, 0], [1, 1], [1, 2]],
            /** X X X */
            /** X X X */
            /** O O O */
            [[2, 0], [2, 1], [2, 2]],
            /** O X X */
            /** O X X */
            /** O X X */
            [[0, 0], [1, 0], [2, 0]],
            /** X O X */
            /** X O X */
            /** X O X */
            [[0, 1], [1, 1], [2, 1]],
            /** X x o */
            /** X x o */
            /** X x o */
            [[0, 2], [1, 2], [2, 2]],
            /** o x x */
            /** X o x */
            /** X x o */
            [[0, 0], [1, 1], [2, 2]],
            /** x x o */
            /** X o x */
            /** o x x */
            [[0, 2], [1, 1], [2, 0]]
        ];

        var esperados = [
            /** O O O */
            /** X X x */
            /** X X X */
            (pos[0][0] === jogador && pos[0][1] === jogador && pos[0][2] === jogador),
            /** X X X */
            /** o o o */
            /** X X X */
            (pos[1][0] === jogador && pos[1][1] === jogador && pos[1][2] === jogador),
            /** X X X */
            /** X X X */
            /** O O O */
            (pos[2][0] === jogador && pos[2][1] === jogador && pos[2][2] === jogador),
            /** O X X */
            /** O X X */
            /** O X X */
            (pos[0][0] === jogador && pos[1][0] === jogador && pos[2][0] === jogador),
            /** X O X */
            /** X O X */
            /** X O X */
            (pos[0][1] === jogador && pos[1][1] === jogador && pos[2][1] === jogador),
            /** X x o */
            /** X x o */
            /** X x o */
            (pos[0][2] === jogador && pos[1][2] === jogador && pos[2][2] === jogador),
            /** o x x */
            /** X o x */
            /** X x o */
            (pos[0][0] === jogador && pos[1][1] === jogador && pos[2][2] === jogador),
            /** x x o */
            /** X o x */
            /** o x x */
            (pos[0][2] === jogador && pos[1][1] === jogador && pos[2][0] === jogador),
        ];

        console.log(esperados);
        var padraoLocalizado = false;
        //var padrao = false;
        for (var i = 0; i < esperados.length; i++) {
            if (esperados[i]) {
                padraoLocalizado = padroes[i];
                //return true;
            }
        }

        console.log("localizado", padraoLocalizado);
        // if(){}
        //console.log(padroes[padraoLocalizado]);

        var localizar = function (padrao) {
            var partes = [];
            console.log('localizando...');
            console.log(padrao);
            for (var i = 0; i < padrao.length; i++) {
                partes.push('[data-x="' + padrao[i][0] + '"][data-y="' + padrao[i][1] + '"]');
            }
            console.log(partes);


            partes.forEach(function (parte) {
                var elem = document.querySelector(parte);
                elem.classList.add("sucesso");
            });


        };

        console.log(localizar(padraoLocalizado));

        return padraoLocalizado !== false ? true : false;
    };

    console.dir(coletar(pos, 1));
    console.dir(coletar(pos, 2));

    ganhou = (coletar(pos, 1) || coletar(pos, 2));

    var velhas = function (ganhou, pos) {
        if (!ganhou) {
            var counter = 0;
            for (var x = 0; x < jogo.tabuleiro.dimensoes.x; x++) {
                for (var y = 0; y < jogo.tabuleiro.dimensoes.y; y++) {
                    if (pos[x][y] !== 0) {
                        counter++;
                    }
                }
            }
            console.log(counter, jogo.tabuleiro.tamanho(), pos);
            if (counter === jogo.tabuleiro.tamanho()) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }
    };

    velha = velhas(ganhou, pos);

    return {
        ganhou: ganhou,
        velha: velha
    };

}

function NumeroAleatorio(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var jogo = new Jogo();
console.log(jogo);