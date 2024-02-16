
class Nodo {
    constructor(llave, valor) {
        this.llave = llave;
        this.valor = valor;
        this.siguiente = null;
    }
}

class TablaHash{
    constructor(){
        this.tabla = new Array(10);
        this.largo = 0;
    }

    _hash(llave){
        let hash = 0;
        for(let i=0; i < llave.length; i++){
            hash += llave.charCodeAt(i);
        }
        return hash % this.tabla.length;
    }

    _calcularPorcentajeOcupacion() {
        let nodosDefinidos = 0;
        this.tabla.forEach(nodo => {
            let actual = nodo;
            while (actual) {
                nodosDefinidos++;
                actual = actual.siguiente;
            }
        });
        return (nodosDefinidos / this.tabla.length) * 100;
    }

    _agrandarTabla() {
        const nuevaTabla = new Array(this.tabla.length * 2);
        this.tabla.forEach(nodo => {
            while (nodo) {
                const indice = this._hash(nodo.llave);
                if (!nuevaTabla[indice]) {
                    nuevaTabla[indice] = new Nodo(nodo.llave, nodo.valor);
                } else {
                    let nuevoNodo = nuevaTabla[indice];
                    while (nuevoNodo.siguiente) {
                        nuevoNodo = nuevoNodo.siguiente;
                    }
                    nuevoNodo.siguiente = new Nodo(nodo.llave, nodo.valor);
                }
                nodo = nodo.siguiente;
            }
        });
        this.tabla = nuevaTabla;
    }

    set(llave, valor){
        const indice = this._hash(llave);
        if (!this.tabla[indice]) {
            this.tabla[indice] = new Nodo(llave, valor);
        } else {
            let nodo = this.tabla[indice];
            while (nodo.siguiente) {
                nodo = nodo.siguiente;
            }
            nodo.siguiente = new Nodo(llave, valor);
        }
        this.largo++;

        // Verificar si la tabla está al 80% de su ocupación y agrandarla si es necesario
        if (this._calcularPorcentajeOcupacion() > 79) {
            this._agrandarTabla();
        }
    }

    get(llave){
        const indice = this._hash(llave);
        let nodo = this.tabla[indice];
        while (nodo) {
            if (nodo.llave === llave) {
                return [nodo.llave, nodo.valor];
            }
            nodo = nodo.siguiente;
        }
        return undefined;
    }

    remover(llave){
        const indice = this._hash(llave);
        let nodo = this.tabla[indice];
        if (!nodo) {
            return false;
        }
        if (nodo.llave === llave) {
            this.tabla[indice] = nodo.siguiente;
            this.largo--;
            return true;
        }
        while (nodo.siguiente) {
            if (nodo.siguiente.llave === llave) {
                nodo.siguiente = nodo.siguiente.siguiente;
                this.largo--;
                return true;
            }
            nodo = nodo.siguiente;
        }
        return false;
    }

    mostrar(){
        this.tabla.forEach((nodo, indice) => {
            const valores = [];
            while (nodo) {
                valores.push(`[${nodo.llave}: ${nodo.valor}]`);
                nodo = nodo.siguiente;
            }
            console.log(`${indice}: ${valores}`);
        });
    }
}


// Probamos el funcionamiento con datos

const tabla = new TablaHash();

tabla.set("Spain", 110);
console.log("Ocupación: " + tabla._calcularPorcentajeOcupacion() + "%");

tabla.set("ǻ", 192);
console.log("Ocupación: " + tabla._calcularPorcentajeOcupacion() + "%");

tabla.set("Italia", 142);
tabla.set("Mexico", 110);
console.log("Ocupación: " + tabla._calcularPorcentajeOcupacion() + "%");

tabla.set("Chile", 142);
tabla.set("Francia", 119)
tabla.set("Alemania", 120)
console.log("Ocupación: " + tabla._calcularPorcentajeOcupacion() + "%");

tabla.set("Uruguay", 115)
console.log("Ocupación: " + tabla._calcularPorcentajeOcupacion() + "%");

tabla.set("Argentina", 252)
tabla.set("Brasil", 130)
console.log("Ocupación: " + tabla._calcularPorcentajeOcupacion() + "%");

tabla.set("Portugal", 120)
tabla.set("Dinamarca", 135)
tabla.set("Eslovenia", 105)
console.log("Ocupación: " + tabla._calcularPorcentajeOcupacion() + "%");

console.log("=== Tabla Hash ===")
tabla.mostrar();