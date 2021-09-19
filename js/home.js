let { append, cons, first, isEmpty, isList, length, rest, map, forEach } = functionalLight;

document.addEventListener("keyup", (e) => {
    // console.log(e)
    if (inLista(moveKeys.up, e.code) || inLista(moveKeys.left, e.code)) {
        let newActiveOption = prevOption(options)
        options.removeClass('active');
        if (isEmpty(newActiveOption)) {
            $(lastItem(options)).addClass('active');
            return true
        }
        $(newActiveOption).addClass('active');
        return true
    } else if (inLista(moveKeys.down, e.code) || inLista(moveKeys.right, e.code)) {
        // moveMenu()
        let newActiveOption = nextOption(options)
        options.removeClass('active');
        if (isEmpty(newActiveOption)) {
            $(first(options)).addClass('active');
            return true
        }
        $(newActiveOption).addClass('active');
        return true
    } else if (e.code === "Enter") {
        // console.log('enteeer')
        first($('.site-main .menu .menu-options .title.active')).click();
    } else
        return false

})
const nextOption = (lista) => {
    if (!length(lista)) {
        return [];
    }
    if ($(first(lista)).hasClass('active') && length(lista) > 1) {
        return first(rest(lista))
    }
    return nextOption(rest(lista))
}
const prevOption = (lista) => {
    if (!length(lista)) {
        return [];
    }
    if ($(first(rest(lista))).hasClass('active') && length(lista) > 1) {
        return first(lista)
    }
    return prevOption(rest(lista))
}