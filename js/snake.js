let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
    return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {
    snake: [{ x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }],
    dir: { x: 1, y: 0 },
    food: { x: 5, y: 5 },
    velocity: {}
}
////////////////////////
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
    const head = first(snake);
    return cons({ x: head.x + dir.x, y: head.y + dir.y }, snake.slice(0, length(snake) - 1));
}

const dx = 20;
const dy = 20;


/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('canvas-holder');
    frameRate(5);
    // var canvas = createCanvas(400, 400);
    background(0, 0, 0);
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {
    background(0, 0, 0);
    fill(143, 253, 0);

    forEach(Mundo.snake, s => {
        rect(s.x * dx, s.y * dy, dx, dy);
    });

}


// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
    return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
    return update(Mundo, {});
}


/**
* Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
*/
function onKeyEvent(Mundo, keyCode) {
    switch (keyCode) {
        case UP_ARROW:
            return update(Mundo, { dir: { y: -1, x: 0 } });
            break;
        case DOWN_ARROW:
            return update(Mundo, { dir: { y: 1, x: 0 } });
            break;
        case LEFT_ARROW:
            return update(Mundo, { dir: { y: 0, x: -1 } });
            break;
        case RIGHT_ARROW:
            return update(Mundo, { dir: { y: 0, x: 1 } });
            break;
        default:
            console.log(keyCode);
            return update(Mundo, {});
    }
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
// function mouseClicked() {
//     Mundo = onMouseEvent(Mundo,
//         { action: "click", mouseX: mouseX, mouseY: mouseY, mouseButton: mouseButton });
// }
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