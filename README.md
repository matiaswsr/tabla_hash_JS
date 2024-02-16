Implementación de una Tabla de Hash en Javascript.

![hash](https://github.com/matiaswsr/tabla_hash_JS/assets/12715211/48f5b5db-632e-4342-a7a3-7006c3c46c9e)

Tomo como punto de partida el ejemplo publicado en: 
https://www.freecodecamp.org/espanol/news/tabla-hash-en-javascript-hash-de-arreglo-asociativo-en-js/

La implementación la realizo utilizando objetos de tipo Nodo:

class Nodo {
    constructor(llave, valor) {
        this.llave = llave;
        this.valor = valor;
        this.siguiente = null;
    }
}

Le agrego la capacidad de manejar colisiones y redimensionar dinámicamente el Array de la Tabla utilizado para guardar los elementos,
si la ocupación del Array es mayor al 79% se redimensiona el Array.
Implemento una función para calcular el porcentaje de ocupación y otra función para agrandar la Tabla de Hash.

Al final del código se crea la tabla y se agregan elementos, se muestra el porcentaje de ocupación y se agranda dinámicamente.
Finaliza la implementación mostrando todos los elementos de la tabla.
