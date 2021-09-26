
// console.log(cons('1',[]));
// function mayorL(lista,max = null){
// 	if(isEmpty(lista)) return max
// 	if (max == null || first(lista)>max) return mayorL(rest(lista),first(lista))
// 	return mayorL(rest(lista),max)
// }
function menorL(lista) {
	if (isEmpty(lista))
		return null
	if (length(lista) == 1)
		return first(lista);
	if (first(lista) < first(rest(lista)))
		return menorL(cons(first(lista), rest(rest(lista))))
	return menorL(rest(lista))

}
// console.log(menorL([2,4,1,3,0]))
/**
 * Encuentra el mayor de los valores numericos en una lista
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista de valores numericos"
 * @return Number || null "Valor Más alto de la lista, null en caso de la lista estar vacia"
 * @Example mayorL([]) -> Return null
 * @Example mayorL([2,3,1]) -> Return 3
 * @Example mayorL([-3,-2,-1]) -> Return -1
 */
function mayorL(lista) {
	if (isEmpty(lista))
		return null
	if (length(lista) == 1)
		return first(lista);
	if (first(lista) > first(rest(lista)))
		return mayorL(cons(first(lista), rest(rest(lista))))
	return mayorL(rest(lista))

}

// console.log(mayorL([]))
// console.log(mayorL([1,6,2]))
// console.log(mayorL([-9]))
// console.log(mayorL([1,6,20,3,-6, 8, 9]))

/**
 * Suma todos los valores numericos de una lista
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista de valores numericos"
 * @return Number "Suma de la lista"
 * @Example sumaLista([]) -> Return 0
 * @Example sumaLista([2,3,1]) -> Return 6
 * @Example sumaLista([-3,-2,-1]) -> Return -6
 */
function sumaLista(lista) {
	if (isEmpty(lista)) return 0
	return first(lista) + sumaLista(rest(lista))
}
/**
 * Calcula el promedio de los valores de una Lista
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista de valores numericos"
 * @return Number || null "Promedio ó null en caso de ser una lista vacía"
 * @Example promedio([]) -> Return null
 * @Example promedio([2,3,1]) -> Return 2
 * @Example promedio([5,10,15]) -> Return 10
 */
function promedio(lista) {
	if (isEmpty(lista)) return null
	return sumaLista(lista) / length(lista)
}
// console.log(promedio([]))
// console.log(promedio([5]))
// console.log(promedio([0,1,8]))
// console.log(promedio([10,2,3,1,4,4,4]))

/**
 * Concatena dos listas
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista1 "Lista base"
 * @param array lista2 "Lista a Concatenar"
 * @return array "Nueva Lista"
 * @Example concat([],[]) -> Return []
 * @Example concat([2,3,1],[1]) -> Return [2,3,1,1]
 * @Example concat(['adios'],['hola']) -> Return ['adios','hola']
 */
function concat(lista1, lista2) {
	if (isEmpty(lista1)) return lista2;
	return cons(first(lista1), concat(rest(lista1), lista2));
}
// console.log(concat([],[]))
// console.log(concat([],[1,2]))
// console.log(concat([3,5],[]))
// console.log(concat([1,2,true],['FDP',3,8,2,7]))

function invertirCicle(input) {
	var ret = new Array;
	for (var i = input.length - 1; i >= 0; i--) {
		ret.push(input[i]);
	}
	return ret;
}


function appendMC(lista, add) {
	// console.log('add: '+ add)
	if (isList(add)) {
		if (isEmpty(lista)) {
			if (isEmpty(add)) {
				return add
			}
			// if(length(add)==1){
			// 	return lista
			// }
			return appendMC(lista, rest(add))
		}
		return cons(first(lista), appendMC(rest(lista), add))
	}
}
// function appendM(lista,add){
// 	if (isList(add)) {
// 		if (isEmpty(add)) {
// 			// return add
// 			if (isEmpty(lista)) {
// 				return lista
// 			}
// 			if(length(lista) == 1){
// 				return first(lista)
// 			}
// 			return cons(appendM(rest(lista),add))
// 		}
// 		if(length(add) == 1){
// 			return first(add)
// 		}
// 		return cons(appendM(lista,add),appendM(lista,rest(add)))
// 	}
// }

// console.log( appendM([1,2,3],10000))
// console.log( append([1,2,3],4))
// // console.log( appendMC([1,2,3],[4,5,6,7,8]))
// // console.log( append([1,2,3],[4,5,6,7,8]))
function lastItem(lista) {
	if (isEmpty(lista)) return lista
	if (length(lista) == 1) return first(lista)
	return lastItem(rest(lista))
}
function invertir(lista) {
	if (isEmpty(lista)) return lista
	// if(length(lista) == 1) return first(lista)
	return cons(lastItem(lista), invertir(rest(lista)))
}
/**
 *  Concatena el valor al final de la lista.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista base"
 * @param any valor "Valor a añadir"
 * @return array "Nueva Lista"
 * @Example appendMC([1,2],3) -> Return [1,2,3]
 * @Example appendMC([2,3,1],1600) -> Return [2,3,1,1600]
 * @Example appendMC(['adios','hola'],'nuevo') -> Return ['adios','hola','nuevo']
 */
function appendMC(lista, valor) {
	if (isEmpty(lista)) {
		return cons(valor, lista)
	}
	return cons(first(lista), appendMC(rest(lista), valor))
}
/**
 * Invierte el orden de los elementos de una lista.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a invertir"
 * @return array "Lista invertida"
 * @Example invertir([]) -> Return []
 * @Example invertir([2,3,1]) -> Return [2,3,1,1]
 * @Example invertir(['adios','hola']) -> Return ['hola','adios']
 */
function invertir(lista) {
	if (isEmpty(lista)) return lista
	return appendMC(invertir(rest(lista)), first(lista))
}
// console.log(invertir([]))
// console.log(invertir([1]))
// console.log(invertir([4,1,2,7,4,1]))
// console.log(invertir([1,2,1]))
// console.log(invertir([1,2,3]))

/**
 * Calcula la sucesión de Fibonacci dado un número
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param Number number "Numero a calcular" 
 * @return Number "Valor de la sucesión de fibonacci del numero dado"
 * @Example fibonacci(2) -> Return 1
 * @Example fibonacci(3) -> Return 2
 * @Example fibonacci(8) -> Return 21
 */
function fibonacci(number) {
	return number < 1 ? 0 : number <= 2 ? 1 : fibonacci(number - 1) + fibonacci(number - 2);
	//Este ternario es lo mismo que el siguiente bloque if (No se ejecuta) --->
	if (number < 1) {
		return 0
	} else if (number <= 2) {
		return 1
	} else {
		return fibonacci(number - 1) + fibonacci(number - 2)
	}
}

/**
 * Genera una lista con los n primeros numeros de la serie fibonacci
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param Number num "n primeros numeros" 
 * @return array "Serie de fibonacci hasta 'num'"
 * @Example fibolist(2) -> Return [ 0, 1 ]
 * @Example fibolist(3) -> Return [ 0, 1, 1 ]
 * @Example fibolist(8) -> Return [0, 1, 1,  2,3, 5, 8, 13]
 */
function fibolist(num) {
	if (num <= 0) return []
	return appendMC(fibolist(num - 1), fibonacci(num - 1))
}
// console.log(fibolist(0));
// console.log(fibolist(1));
// console.log(fibolist(2));
// console.log(fibolist(3));
// console.log(fibolist(6));

/**
 * Genera una copia de una lista de varios niveles de manera recursiva
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "lista a copiar" 
 * @return array "copia de la lista"
 * @Example copy([21]) -> Return [ 21 ]
 * @Example copy([[1],[2],[3]]) -> Return [ [ 1 ], [ 2 ], [ 3 ] ]
 * @Example copy([[1],[[2],[2]],[3,3,[3,3]]])) -> Return [ [ 1 ], [ [ 2 ], [ 2 ] ], [ 3, 3, [ 3, 3 ] ] ]
 */
function copy(lista) {
	if (isEmpty(lista)) return lista
	return cons(first(lista), rest(lista))
}
// console.log(copy([]))
// console.log(copy([1, 2, 3]))
// console.log(copy([1, 2, [3, 4], [1]]))
// console.log(copy([[9]]))


/**
 * Inserta un elemento elem en la posición x de la lista. 
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param any elem "Elemento a agregar a la lista" 
 * @param number posicion "Posición en la que se va a añadir el elemento 
 * @param array lista "Lista a la que se va a agregar el elemento" 
 * @return array "Nueva Lista, con el elemento añadido"
 * @Example insertX(7,0,[1,2,3]) -> Return [ 7, 1, 2, 3 ]
 * @Example insertX(7,0,[]) -> Return [ 1, 0, 3, 5, 9, 3 ]
 * @Example insertX(8,-1,[1,0,3,5,9,3]) -> Return 125
 */
function insertX(elem, posicion, lista) {
	// console.log(lista)
	if (posicion == 0) return cons(elem, lista)
	if (posicion >= 0 && posicion <= length(lista)) return cons(first(lista), insertX(elem, posicion - 1, rest(lista)))
	return lista
}
// console.log(insertX(7,0,[1,2,3]))
// console.log(insertX(7,1,[1,2,3]))
// console.log(insertX(8,6,[1,0,3,5,9,3]))
// console.log(insertX(8,7,[1,0,3,5,9,3]))
// console.log(insertX(8,-1,[1,0,3,5,9,3]))
// console.log(insertX(7,0,[]))


/**
 * Reemplaza el elemento de la posición x de la lista por el elemento elem.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param number posicion "Posición en la que se va a añadir el elemento 
 * @param array lista "Lista a la que se va a agregar el elemento" 
 * @param any elem "Elemento a agregar a la lista" 
 * @return array "Nueva Lista, con el elemento intercambiado"
 * @example replaceX(0,[1,2,3],7) -> return [ 7, 2, 3 ]
 * @example replaceX(1,[1,2,3],7) -> return [ 1, 7, 3 ]
 * @example replaceX(0,[], 7) -> return [ 7 ]
 */
function replaceX(posicion, lista, elem) {
	// console.log(lista)
	if (posicion > 0 && posicion < length(lista)) return cons(first(lista), replaceX(posicion - 1, rest(lista), elem))
	if (posicion == 0 && !isEmpty(lista)) return cons(elem, rest(lista))
	return lista
}
// console.log(replaceX(0,[1,2,3],7))
// console.log(replaceX(1,[1,2,3],7))
// console.log(replaceX(5,[1,0,3,5,9,3], 8))
// console.log(replaceX(-1,[1,0,3,5,9,3], 8))
// console.log(replaceX(0,[], 7))

/**
 * Evalua si el elemento "elem", existe en la lista
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a evaluar" 
 * @param any elem "Elemento a buscar"
 * @return boolean "True si existe, False si no existe"
 * @example inLista([1,2,3,4], 2) -> return true
 * @example inLista([1,2,3,4], 3.5) -> return false
 * @example inLista([], 10) -> return false
 */
function inLista(lista, elem) {
	if (isEmpty(lista)) return false;
	if (JSON.stringify(first(lista)) == JSON.stringify(elem)) return true;
	return inLista(rest(lista), elem);
}
/**
 * Retorna el índice n donde se encuentra el elemento elem si existe
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a evaluar" 
 * @param number elem "Elemento numerico a buscar"
 * @return number "Posición del elemento"
 * @example lookupx([1,2,3,4], 2) -> return 1
 * @example lookupx([1,2,3,4], 3.5) -> return 3
 * @example lookupx([2,4,6,10], 10) -> return 3
 */
function _lookupx(lista, elem) {
	if (isEmpty(lista)) return 0
	if (first(lista) == elem) return 0
	if (first(lista) < elem && first(rest(lista)) > elem) return 1
	return 1 + _lookupx(rest(lista), elem)
}
/**
 * Retorna el índice n donde se encuentra el elemento elem si existe, si no existe aplica -( n + 1 ).
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a evaluar" 
 * @param number elem "Elemento numerico a buscar"
 * @return number "Posición del elemento"
 * @example lookupx([1,2,3,4], 2) -> return 1
 * @example lookupx([1,2,3,4], 3.5) -> return -4
 * @example lookupx([2,4,6,10], 10) -> return 3
 */
function lookupx(lista, elem) {
	if (inLista(lista, elem)) return _lookupx(lista, elem);
	return (_lookupx(lista, elem) + 1) * -1
}
// console.log(lookupx([1,2,3,4], 2));
// console.log(lookupx([1,2,3,4], 3.5));
// console.log(lookupx([], 1.1));
// console.log(lookupx([2,4,6,10], 10));
// console.log(lookupx([2,4,6,10], 11));

/**
 * Inserta el elemento "elem" en una lista numerica ordenada de forma ascentente.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista base" 
 * @param number elem "Elemento numerico a insertar"
 * @return array "Nueva Lista"
 * @example insertInOrder([1,2,3,4], 2) -> return [1,2,2,3,4]
 * @example insertInOrder([1,2,3,4], 3.5) -> return [ 1, 2, 3, 3.5, 4 ]
 * @example insertInOrder([2,4,6,10], 10) -> return [ 2, 4, 6, 10, 10 ]
 */
function insertInOrder(lista, elem) {
	if (elem == null) return lista
	if (isEmpty(lista)) return cons(elem, lista)
	if (elem < first(lista)) return cons(elem, insertInOrder(lista), null)
	return cons(first(lista), insertInOrder(rest(lista), elem))
}
// console.log(insertInOrder([], -2.3));
// console.log(insertInOrder([-2, 3, 5, 5, 6 ], 4));
// console.log(insertInOrder([-2, 3, 5, 5, 6 ], 3));
// console.log(insertInOrder([-2, 3, 5, 5, 6 ], 8));
// console.log(insertInOrder([-2, 3, 5, 5, 6 ], -3));
// console.log(insertInOrder([-2, 3, 5, 5, 6 ], -2));
// console.log(insertInOrder([-2, 3, 5, 5, 6 ], 5.2));

/**
 * Retorna el índice n donde se encuentra el elemento elem si existe
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a evaluar" 
 * @param number elem "Elemento numerico a buscar"
 * @return number "Posición del elemento"
 * @example lookupx([1,2,3,4], 2) -> return 1
 * @example lookupx([1,2,3,4], 3.5) -> return 3
 * @example lookupx([2,4,6,10], 10) -> return 3
 */
function buscar(lista, elem) {
	if (isEmpty(lista)) return 0
	if (first(lista) == elem) return 0
	if (first(lista) < elem && first(rest(lista)) > elem) return 1
	if (inLista(lista, elem)) {
		return 1 + buscar(rest(lista), elem)
	} else {
		return -1
	}
}
// console.log(buscar([["3",4],5,3,4], 3))
// console.log(buscar([1,2,3,4], 3.5))
// console.log(buscar(["a"], 1.1))
// console.log(buscar([11,25, 1, 6,10], 6))
/**
 * Elimina el elemento en el indice especificado, de la lista.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a operar" 
 * @param number indice "Indice del elemento a eliminar"
 * @return array "Nueva Lista"
 * @example deleteN([1,2,3,4], 2) -> return [1,2,4]
 * @example deleteN([1,2,3,4], 3) -> return [1,2,3]
 * @example deleteN([2,4,6,10], 10) -> return [2,4,6,10]
 */
function deleteN(lista, indice) {
	if (indice > length(lista) || indice < 0) return lista
	if (indice == 0) return rest(lista)
	return cons(first(lista), deleteN(rest(lista), indice - 1))
}
// console.log(deleteN([1,2,3], 7));
// console.log(deleteN([1,2,3], 1));
// console.log(deleteN([1,0,3,5,9,3], 5));
// console.log(deleteN([1,0,3,5,9,3], 0));
// console.log(deleteN([], 0));
// console.log(deleteN([2, 4], -1));

// function ordenar(lista){
// 	// console.log('mylista: '+lista)
// 	if (isEmpty(lista)) return lista
// 	// if (isList(first(lista))) return cons(ordenar(first(lista)),rest(lista))
// 	if (isList(first(lista))) return true
// 	if (first(lista) > first(rest(lista))) return cons(first(lista),ordenar(rest(lista)))
// 	return ordenar(appendMC(rest(lista),first(lista)))
// }
/**
 * Elimina el elemento en el indice especificado, de la lista.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a operar" 
 * @param number indice "Indice del elemento a eliminar"
 * @return array "Nueva Lista"
 * @example deleteN([1,2,3,4], 2) -> return [1,2,4]
 * @example deleteN([1,2,3,4], 3) -> return [1,2,3]
 * @example deleteN([2,4,6,10], 10) -> return [2,4,6,10]
 */
function ordenar(lista) {
	if (isEmpty(lista)) return lista
	if (isList(first(lista))) return cons(ordenar(first(lista)), rest(lista))
	return cons(menorL(lista), ordenar(deleteN(lista, buscar(lista, menorL(lista)))))
}
// console.log(ordenar([3,5,3,4]))
// console.log(ordenar([1,2,3,4]))
// console.log(ordenar([[4,3,2,1], 8]))
// console.log(ordenar([]))

/**
 * Filtra una lista con la condición "filtro" dada. Retorna una nueva lista con los resultados.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a evaluar" 
 * @param method filtro "condición a evaluar en cada elemento"
 * @return array "Nueva Lista"
 * @example filter([1,2,3,4], (a) => a >= 2)) -> return [2,3,4]
 * @example filter([1,2,3,4], (a) => a == 5) -> return []
 * @example filter([2,3,4,6,10], (x) => x % 2 == 0) -> return [2,4,6,10]
 */
function filter(lista, filtro) {
	if (isEmpty(lista)) return lista
	else if (filtro(first(lista))) return cons(first(lista), filter(rest(lista), filtro))
	else return filter(rest(lista), filtro)

}
// console.log(filter([1, 3, 4, 6, 0, 1], (a) => a > 3))
// console.log(filter(["ab", "acv", "gggg", "cds"], (a) => a.length == 3 ))

/**
 * Aplica la función  "method",a cada elemento de una lista. Retorna una nueva lista con los resultados.
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a evaluar" 
 * @param method method "Función a aplicar"
 * @return array "Nueva Lista"
 * @example map([1,2,3,4], (a) => a *2)) -> return [ 2, 4, 6, 8 ]
 * @example map([{a: "María"}, {a: "Carlos"}], (v) => "Hola " + v.a) -> return [ 'Hola María', 'Hola Carlos' ]
 * @example map([2,3,4,6,10], (x) => Math.pow(x,2)) -> return [ 4, 9, 16, 36, 100 ]
 */
function mapear(lista, method) {
	if (isEmpty(lista)) return lista;
	return cons(method(first(lista)), mapear(rest(lista), method))
}
// console.log(map([1, 2, 3, 4], (x) => x * x))
// console.log(map([{a: "María"}, {a: "Carlos"}], (v) => "Hola " + v.a))

/**
 * Aplica una función a una lista genérica "lista", y agrega todos los valores de la lista para producir una única salida
 * @author Michael Cardenas - michael.cardenas@correounivalle.edu.co - CodEstudiante: 202123935
 * @param array lista "Lista a evaluar" 
 * @param method method "Función a aplicar"
 * @param method acum "Acumulado del method"
 * @return number || string "Resultado"
 * @example reduce([1, 2, 3, 4, 5], (val, acum) => acum * val, 1) -> return 120
 * @example reduce([1, 7, 3, 14, 5], (val, acum) => Math.min(val, acum), 9999) -> return 1
 * @example reduce([1, 2, 3, 4, 5], (val, acum) => acum + val, 0) -> return 15
 */
function reduce(lista, method, acum) {
	if (isEmpty(lista)) return acum
	return method(first(lista), reduce(rest(lista), method, acum))
}
// console.log(reduce([1, 2, 3, 4, 5], (val, acum) => acum + val, 0));
// console.log(reduce([1, 2, 3, 4, 5], (val, acum) => acum * val, 1));
// console.log(reduce([1, 7, 3, 14, 5], (val, acum) => Math.max(val, acum), 0));
// console.log(reduce([1, 7, 3, 14, 5], (val, acum) => Math.min(val, acum), 9999));
// console.log(reduce([{a: "María"}, {a: "Carlos"}], (val, acum) => acum + "-" +val.a, ""))

function filtrar(inventario) {
	if (isEmpty(inventario)) return inventario;
	if (first(inventario)['costo'] < 10) {
		return cons(first(inventario), filtrar(rest(inventario)))
	} else {
		return filtrar(rest(inventario))
	}
}

function objectEquals(obj1, obj2) {
	return JSON.stringify(obj1) == JSON.stringify(obj2)
}

function stringRepeat(text, times) {
	if (times == 0)
		return ""
	return text + stringRepeat(text, times - 1)

}