const { promises: fs } = require('fs');
const { stringify } = require('qs');

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }
    
    async getAll() {
        try {
            const objs = await fs.readFile(this.ruta, "utf-8");

            return JSON.parse(objs);

        } catch (error) {
            return [];
        }
    }
   

    async getById(id) {
        if (typeof id !== 'number') {
            console.log('Debe ingresar un valor numerico')
        } else {           
                const objs = await this.getAll()

                const buscado = objs.find(o => o.id === id)
                
                
                if (buscado === undefined) {
                    console.log("El id no coincide con un producto");
                } else {
                    return buscado
                }
            }
        }
    }


exports.Contenedor = Contenedor;