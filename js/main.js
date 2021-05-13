// const {cons, first, rest, isEmpty, isList, length } = require('../vendor/functional-light/lib');
const moveKeys = {
    up: ['KeyW','ArrowUp'],
    right:['KeyD','ArrowRight'],
    down:['KeyS','ArrowDown'],
    left:['KeyA','ArrowLeft']
};
const options = $('.site-main .menu .menu-options .title');
$(document).ready(function(){
    options.hover(function(e){
        options.removeClass('active');
        e.target.classList.add('active');
    });
    
})

