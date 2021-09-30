let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//Longitudes del snake
// const CUADRICULA = 
const sizeBoard = {
    Normal: 460,
    Grande: 580
}
const dx = parseInt(getParametro('sizeX', 20));
const dy = parseInt(getParametro('sizeY', 20));
const tamañoParam = getParametro('Tamaño', 'Normal');

// const CanvasY = getParametro('canvasY', 460);
// const CanvasX = getParametro('canvasX', 580);
const CanvasY = 460
const CanvasX = sizeBoard[tamañoParam];
const FPS = 5;
const snakeColor = '' + getParametro('snColor', '#8FFD00')
console.log(snakeColor)

let coinSound, powerSound, lose, loseLiveSound, backgroundSound;
function preload() {
    soundFormats('wav', 'ogg');
    coinSound = loadSound('../assets/sounds/coin.wav');
    powerSound = loadSound('../assets/sounds/power.wav');
    loseSound = loadSound('../assets/sounds/lose.wav');
    loseLiveSound = loadSound('../assets/sounds/loseLive.wav');
    // backgroundSound = loadSound('../assets/sounds/background.wav');

}

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
const lblScore = document.getElementById('lbl-score');
const livesField = document.getElementById('lives-container');
const ESTADOS = {
    RUNNING: 1,
    PAUSED: 2,
    FINISHED: 3
}

/**
 * Mundo Inicial
 */
const MundoBase = {
    snake: [{ x: 3, y: 3 }, { x: 2, y: 3 }],
    dir: { y: 0, x: 1 },
    food: { x: 5, y: 5 },
    velocity: 5,
    score: setScore(100),
    lives: 3,
    isSuper: { value: false, count: 0 },
    tic: true,
    status: ESTADOS.PAUSED,
    record: false,
    genPower: {
        value: false,
        powerXY: null
    },
}

var Mundo = update({}, update(MundoBase, { food: drawFood(MundoBase) }))

/**
 * Constantes que define las direcciones del snake
 */
const DIRECCIONES = {
    left: { y: 0, x: -1 },
    right: { y: 0, x: 1 },
    up: { y: -1, x: 0 },
    down: { y: 1, x: 0 }
}
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(mundo, dir) {
    if (mundo.isSuper.value) {
        console.log('is super: ', mundo.isSuper.value)
        // throw Error('stop')
    }
    const snake = mundo.snake;
    const head = first(snake);
    const isSuper = mundo.isSuper;
    if (colision(mundo.snake) && !isSuper.value) {
        frameRate(MundoBase.velocity)
        return updateInterfaz(update(MundoBase, colisionWorld(mundo)));
    }
    const Powered = {
        value: snakeAtePower(mundo) || isSuper.count > 0,
        count: (snakeAtePower(mundo)) ? 100 : isSuper.count - 1
    }
    const newHead = (Powered.value && colision(mundo.snake) && (!inLista(rest(snake), first(snake)))) ? headInvert(mundo) : { x: head.x + dir.x, y: head.y + dir.y }
    if (snakeAte(mundo)) {
        coinSound.play();
        const newVelocity = (mundo.velocity <= 25) ? mundo.velocity + 1 : mundo.velocity;
        const newScore = mundo.score + 100;
        frameRate(newVelocity);
        const gotPower = newScore % 500 == 0
        const newGenPower = {
            value: gotPower,
            powerXY: (gotPower) ? drawFood(mundo) : false
        }
        return { snake: cons(newHead, mundo.snake), food: drawFood(mundo), velocity: newVelocity, score: setScore(newScore), genPower: newGenPower, isSuper: Powered };
    } else {
        return { snake: cons(newHead, mundo.snake.slice(0, length(mundo.snake) - 1)), isSuper: Powered };
    }
}



/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
    var canvas = createCanvas(CanvasX, CanvasY);
    canvas.parent('canvas-holder');
    frameRate(Mundo.velocity);
    // var canvas = createCanvas(400, 400);
    background(0, 0, 0);
}

/**
 * Dibuja el canvas.
 */
function drawGame(mundo) {
    // console.log(mundo)
    if (mundo.status != ESTADOS.RUNNING) {
        textStyle(BOLDITALIC);
        // console.log(mundo);
        // throw Error('Error')
        fill(143, 253, 0);
        textSize(30);
        textAlign(CENTER, BASELINE);
        text("Enter para empezar!", 0, 80, width);
        text("Muévete con ↑ ↓ → ←", 0, 160, width);
        if (mundo.record) {
            fill(252, 244, 0);
            text("PUNTAJE FINAL:", 0, 240, width);
            fill(255, 31, 0);
            textSize(38);
            text(mundo.record, 0, 320, width);
            updateInterfaz({ lives: 0, score: mundo.record })
        }
        frameRate(0)
    } else {
        background(0, 0, 0);
        fill(snakeColor);
        if (mundo.isSuper.value) {
            fill(255, 255, 255);

        }
        //pinta la culebra
        forEach(mundo.snake, s => {
            rect(s.x * dx, s.y * dy, dx, dy);
        });

        //Pinta la comida
        fill(4, 0, 255);
        rect(mundo.food.x * dx, mundo.food.y * dy, dx, dy, 20)
        if (mundo.genPower.value && !mundo.isSuper.value) {
            fill(255, 213, 59);
            // star((mundo.genPower.powerXY.x * dx) + 5, (mundo.genPower.powerXY.y * dy) + 5, 7, 12, 5);
            rect(mundo.genPower.powerXY.x * dx, mundo.genPower.powerXY.y * dy, dx, dy, 20)
            // console.log(mundo)
            // throw Error('AQUI')
        }
    }

    // console.log(mundo.snake)

}


/**
 * Esto se ejecuta en cada tic del reloj.
 */
function onTic(mundo) {
    // console.log('tic', mundo)
    if (mundo.record)
        updateInterfaz({ lives: 0, score: mundo.record })
    else
        updateInterfaz(mundo)
    return update(mundo, update(moveSnake(mundo, Mundo.dir), { tic: true }));
}

/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent(mundo, keyCode) {
    if (mundo.tic) {

        switch (keyCode) {
            case UP_ARROW:
            case 87:
                if (objectEquals(mundo.dir, DIRECCIONES.down))
                    return update(mundo, { dir: DIRECCIONES.down, tic: false })
                return update(mundo, { dir: { y: -1, x: 0 }, tic: false });
                break;
            case DOWN_ARROW:
            case 83:
                if (objectEquals(mundo.dir, DIRECCIONES.up))
                    return update(mundo, { dir: DIRECCIONES.up, tic: false })
                return update(mundo, { dir: { y: 1, x: 0 }, tic: false });
                break;
            case LEFT_ARROW:
            case 65:
                if (objectEquals(mundo.dir, DIRECCIONES.right))
                    return update(mundo, { dir: DIRECCIONES.right, tic: false })
                return update(mundo, { dir: { y: 0, x: -1 }, tic: false });
                break;
            case RIGHT_ARROW:
            case 68:
                if (objectEquals(mundo.dir, DIRECCIONES.left))
                    return update(mundo, { dir: DIRECCIONES.left, tic: false })
                return update(mundo, { dir: { y: 0, x: 1 }, tic: false });
                break;
            case 13:
                frameRate(mundo.velocity)
                return update(mundo, initGame());
            default:

                return update(mundo, {});
        }
    }
    return update(mundo, {});
}

/**
 * Pinta el mundo en el Canvas.
 */
function draw() {
    drawGame(Mundo);
    Mundo = onTic(Mundo);
};

/**
 * Listener de eventos del teclado, ejecuta el metodo onKeyEvent
 */
function keyPressed() {
    Mundo = onKeyEvent(Mundo, keyCode);
}

/**
 * Función que revisa si la serpiente comió.
 */
function snakeAte(mundo) {
    const snake = mundo.snake
    const head = first(snake);
    const comio = head.x == mundo.food.x && head.y == mundo.food.y
    return comio;
}

/**
 * Función que genera una nueva posición de comida.
 */
function drawFood(mundo) {
    const genNewComida = () => {
        const posX = Math.max(Math.floor(Math.random() * getCuadrosX()), 1);
        const posY = Math.max(Math.floor(Math.random() * getCuadrosY()), 1);
        const punto = { x: posX, y: posY }
        if (inLista(mundo.snake, punto))
            return genNewComida()
        return { x: posX, y: posY }

    }
    return genNewComida();
}

/**
 * Función que revisa la colisión de la serpiente con las paredes del canvas o con sí mismo.
 */
function colision(snake) {
    return (inLista(rest(snake), first(snake)) || isBorder(snake))
    return inLista(rest(snake), first(snake))
}

/**
 * Función que determina si la cabeza de la serpiente se encuentra en el borde del canvas.
 */
function isBorder(snake) {
    const head = first(snake)
    return (head.x < 0 || head.x > getCuadrosX()) || (head.y < 0 || head.y > getCuadrosY())
}

/**
 * Calcula la cantidad de cuadros del Canvas en el eje X
 */
function getCuadrosX() {
    return (CanvasX / dx) - 1
}

/**
 * Calcula la cantidad de cuadros del Canvas en el eje Y
 */
function getCuadrosY() {
    return (CanvasY / dy) - 1
}

/**
 * Actualiza e contenedor de Puntos
 */
function setScore(score) {
    lblScore.innerHTML = score
    return score
}
/**
 * Actualiza e contenedor de Vidas
 */
function setLives(mundo) {
    const texto = stringRepeat(`<i class="fas fa-heart fa-2x heart"></i>`, mundo);
    livesField.innerHTML = texto;
}
/**
 * Actualiza la interfaz de Puntos y Vidas.
 */
function updateInterfaz(mundo) {
    if (mundo.record) {
        setLives(0)
        setScore(mundo.record)
    } else {
        setLives(mundo.lives)
        setScore(mundo.score)
    }
    return mundo;
}
/**
 * Función que reinicia el estado del juego dependiendo si las vidas llegan a 0 (pierde).
 */
function colisionWorld(mundo) {
    const lose = mundo.lives - 1 == 0;
    const newLives = (lose) ? MundoBase.lives : mundo.lives - 1;
    const newScore = (lose) ? MundoBase.score : mundo.score;
    const newStatus = (lose) ? ESTADOS.FINISHED : ESTADOS.RUNNING;
    const newRecord = (lose) ? mundo.score : false;
    if (lose)
        loseSound.play()
    else
        loseLiveSound.play()
    return { lives: newLives, score: newScore, status: newStatus, record: newRecord, velocity: MundoBase.velocity }
}
/**
 * Función que define los parametros iniciales de cada partida.
 */
function initGame() {
    return {
        status: ESTADOS.RUNNING,
        lives: MundoBase.lives,
        score: MundoBase.score,
        record: MundoBase.record,
        food: drawFood(MundoBase),
        velocity: MundoBase.velocity,
        isSuper: MundoBase.isSuper
    }
}

/**
 * Función que revisa si la serpiente adquirio un poder.
 */
function snakeAtePower(mundo) {
    // const head = first(mundo.snake);
    if (mundo.genPower.value) {
        // console.log(mundo)
        const snake = mundo.snake
        const head = first(snake);
        const comioPoder = head.x == mundo.genPower.powerXY.x && head.y == mundo.genPower.powerXY.y
        // console.log('comiopoder: ', comioPoder)
        if (comioPoder)
            powerSound.play()
        return comioPoder;
    }
    return false
}

/**
 * Función que proyecta la cabeza de la serpiente al lado contrario de donde se encuentra.
 */
function headInvert(mundo) {
    // const snake = mundo.snake
    //isborder: (head.x < 0 || head.x > getCuadrosX()) || (head.y < 0 || head.y > getCuadrosY())
    const head = first(mundo.snake);
    const newX = (head.x < 0 || head.x > getCuadrosX()) ?
        ((head.x <= 0) ? Math.trunc(getCuadrosX()) : 0)
        : head.x;
    const newY = (head.y < 0 || head.y > getCuadrosY()) ?
        ((head.y <= 0) ? Math.trunc(getCuadrosY()) : 0)
        : head.y;
    return { x: newX, y: newY }
}

/**
 * Función que obtiene el aprametro deseado de la URL , o retorna un valor pre definido.
 */
function getParametro(name, def) {
    if (urlParams.has(name))
        return urlParams.get(name)
    return def
}