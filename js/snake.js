let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}
const lblScore = document.getElementById('lbl-score');

//////////////////////// Mundo inicial
const MundoBase = {
    snake: [{ x: 1, y: 5 }, { x: 0, y: 5 }],
    dir: { y: 0, x: 1 },
    food: { x: 5, y: 5 },
    velocity: 5,
    score: setScore(100),
    lives: 3,
    tic: true
}

var Mundo = update(Mundo, MundoBase)

const DIRECCIONES = {
    left: { y: 0, x: -1 },
    right: { y: 0, x: 1 },
    up: { y: -1, x: 0 },
    down: { y: 1, x: 0 }
}
////////////////////////
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(mundo, dir) {
    const head = first(mundo.snake);
    if (colision(mundo.snake)) {
        return updateInterfaz(MundoBase);
    }

    if (snakeAte(mundo)) {
        frameRate(mundo.velocity++);
        return { snake: cons({ x: head.x + dir.x, y: head.y + dir.y }, mundo.snake), food: drawFood(mundo), velocity: mundo.velocity++, score: setScore(mundo.score + 100) };
    } else {
        return { snake: cons({ x: head.x + dir.x, y: head.y + dir.y }, mundo.snake.slice(0, length(mundo.snake) - 1)) };
    }
}

//Longitudes del snake
// const CUADRICULA = 
const dx = 20;
const dy = 20;
const CanvasX = 400;
const CanvasY = 400;
const FPS = 5;


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

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(mundo) {
    background(0, 0, 0);
    fill(143, 253, 0);

    //pinta la culebra
    forEach(mundo.snake, s => {
        rect(s.x * dx, s.y * dy, dx, dy);
    });

    //Pinta la comida
    fill(4, 0, 255);
    rect(mundo.food.x * dx, mundo.food.y * dy, dx, dy, 20)
    // console.log(mundo.snake)

}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(mundo) {
    // updateInterface(mundo)
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
    // console.log(keyCode)
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
            // case 13:
            //     throw pausa()
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
//     Mundo = onMouseEvent(Mundo,
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
    // return update(mundo, mundo.food = { x: 10, y: 10 })
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
function setLives() {

}
function updateInterfaz(mundo) {
    // setLives(mundo.lives)
    setScore(mundo.score)
    return mundo;
}

// console.log(Math.max(Math.floor(Math.random() * (400 / 20)), 1))

// console.log(JSON.stringify([1, 2]) == JSON.stringify([1, 2]))