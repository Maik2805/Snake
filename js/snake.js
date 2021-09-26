let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;
//Longitudes del snake
// const CUADRICULA = 
const dx = 20;
const dy = 20;

const CanvasX = 460;
const CanvasY = 460;
const FPS = 5;

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

//////////////////////// Mundo inicial
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
    const head = first(mundo.snake);
    const isSuper = mundo.isSuper;
    if (colision(mundo.snake) && !isSuper.value) {
        frameRate(MundoBase.velocity)
        return updateInterfaz(update(MundoBase, colisionWorld(mundo)));
    }
    const Powered = {
        value: snakeAtePower(mundo) || isSuper.count > 0,
        count: (snakeAtePower(mundo)) ? 100 : isSuper.count - 1
    }
    const newHead = (Powered.value && colision(mundo.snake)) ? headInvert(mundo) : { x: head.x + dir.x, y: head.y + dir.y }
    if (snakeAte(mundo)) {
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

// Dibuja el canvas.
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
        fill(143, 253, 0);
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
            rect(mundo.genPower.powerXY.x * dx, mundo.genPower.powerXY.y * dy, dx, dy, 20)
            // console.log(mundo)
            // throw Error('AQUI')
        }
    }

    // console.log(mundo.snake)

}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(mundo) {
    // console.log('tic', mundo)
    if (mundo.record)
        updateInterfaz({ lives: 0, score: mundo.record })
    else
        updateInterfaz(mundo)
    return update(mundo, update(moveSnake(mundo, Mundo.dir), { tic: true }));
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
    return update(Mundo, {});
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

//---------------------

function draw() {
    drawGame(Mundo);
    Mundo = onTic(Mundo);
};

// Esta función se ejecuta cada vez que presionamos una tecla.
// No cambie esta función. Su código debe ir en onKeyEvent
function keyPressed() {
    Mundo = onKeyEvent(Mundo, keyCode);
}

// Esta función se ejecuta cada vez movemos el mouse.
// No cambie esta función. Su código debe ir en onMouseEvent
// function mouseMoved() {
//     Mundo = onMouseEvent(Mundo,
//         { action: "move", mouseX: mouseX, mouseY: mouseY });
// }

// // Estas funciones controlan los eventos del mouse.
// // No cambie estas funciones. Su código debe ir en OnMouseEvent
function mouseClicked() {
    Mundo = onMouseEvent(Mundo,
        { action: "click", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
}
// // Estas funciones controlan los eventos del mouse.
// // No cambie estas funciones. Su código debe ir en OnMouseEvent
// function mouseDragged() {
//     Mundo = onMouseEvent(Mundo,
//         { action: "drag", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
// }

// // Estas funciones controlan los eventos del mouse.
// // No cambie estas funciones. Su código debe ir en OnMouseEvent
// function mousePressed() {
//     Mundo = onMouseEvent(Mundo,draw
//         { action: "press", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
// }
// // Estas funciones controlan los eventos del mouse.
// // No cambie estas funciones. Su código debe ir en OnMouseEvent
// function mouseReleased() {
//     Mundo = onMouseEvent(Mundo,
//         { action: "release", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
// }

// onTic(Mundo)

function snakeAte(mundo) {
    const snake = mundo.snake
    const head = first(snake);
    const comio = head.x == mundo.food.x && head.y == mundo.food.y
    return comio;
}

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

function colision(snake) {
    return (inLista(rest(snake), first(snake)) || isBorder(snake))
    return inLista(rest(snake), first(snake))
}


function isBorder(snake) {
    const head = first(snake)
    return (head.x < 0 || head.x > getCuadrosX()) || (head.y < 0 || head.y > getCuadrosY())
}

function getCuadrosX() {
    return (CanvasX / dx) - 1
}

function getCuadrosY() {
    return (CanvasY / dy) - 1
}

function setScore(score) {
    lblScore.innerHTML = score
    return score
}
function setLives(mundo) {
    const texto = stringRepeat(`<i class="fas fa-heart fa-2x heart"></i>`, mundo);
    livesField.innerHTML = texto;
}
function updateInterfaz(mundo) {
    // console.log(mundo)
    if (mundo.record) {
        setLives(0)
        setScore(mundo.record)
        // return update(MundoBase, { record: false })
        // return update(mundo, { lives: MundoBase.lives, record: false });
    } else {
        setLives(mundo.lives)
        setScore(mundo.score)
    }
    return mundo;
}

function colisionWorld(mundo) {
    const lose = mundo.lives - 1 == 0;
    const newLives = (lose) ? MundoBase.lives : mundo.lives - 1;
    const newScore = (lose) ? MundoBase.score : mundo.score;
    const newStatus = (lose) ? ESTADOS.FINISHED : ESTADOS.RUNNING;
    const newRecord = (lose) ? mundo.score : false;
    return { lives: newLives, score: newScore, status: newStatus, record: newRecord, velocity: MundoBase.velocity }
}
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

function snakeAtePower(mundo) {
    // const head = first(mundo.snake);
    if (mundo.genPower.value) {
        // console.log(mundo)
        const snake = mundo.snake
        const head = first(snake);
        const comioPoder = head.x == mundo.genPower.powerXY.x && head.y == mundo.genPower.powerXY.y
        // console.log('comiopoder: ', comioPoder)
        return comioPoder;
    }
    return false
}

function headInvert(mundo) {
    // const snake = mundo.snake
    //isborder: (head.x < 0 || head.x > getCuadrosX()) || (head.y < 0 || head.y > getCuadrosY())
    const head = first(mundo.snake);
    // var
    // var newX;
    const newX = (head.x < 0 || head.x > getCuadrosX()) ?
        ((head.x <= 0) ? Math.trunc(getCuadrosX()) : 0)
        : head.x;
    const newY = (head.y < 0 || head.y > getCuadrosY()) ?
        ((head.y <= 0) ? Math.trunc(getCuadrosY()) : 0)
        : head.y;
    // if (head.x < 0 || head.x > getCuadrosX()) {
    //     var newX = (head.x <= 0) ? Math.trunc(getCuadrosX()) : 0;
    //     // const newX = Math.trunc(CanvasX / 20)
    // } else {
    //     var newX = head.x;
    // }
    // if (head.y < 0 || head.y > getCuadrosY()) {
    //     var newY = (head.y <= 0) ? Math.trunc(getCuadrosY()) : 0;
    //     // const newX = Math.trunc(CanvasX / 20)
    // } else {
    //     var newY = head.y;
    // }
    return { x: newX, y: newY }
    console.log({ x: newX, y: newY })
    throw Error('stop')
    const newHead = { x: newX, y: newY }

    //     const dx = 20;
    // const dy = 20;

    // const CanvasX = 460;
    // const CanvasY = 460;
}


// console.log(Math.max(Math.floor(Math.random() * (400 / 20)), 1))

// console.log(JSON.stringify([1, 2]) == JSON.stringify([1, 2]))