const express = require('express')
const app = express()
const { Router } = express

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { Contenedor } = require('./main');
const routerProductos = new Router()
const producto = new Contenedor('./public/productos.txt');

/* --------------------------------------------- */

//Muestra todos los productos

routerProductos.get('/', async (req, res) => {

    res.send(await producto.getAll())

})

// Muestra el producto segun su ID

routerProductos.get('/:id', async (req, res) => {

    const { id } = req.params

    res.send(await producto.getById(id))
})

// Agrega prducto

routerProductos.post('/', async (req, res) => {

    const product = req.body
    
    res.send(await producto.save(product))

})

// Modifica el producto segun su ID

routerProductos.put('/:id', async (req, res) => {

    const { id } = req.params
    const productoMod = {}
    productoMod.title = req.body.title
    productoMod.price = req.body.price
    productoMod.thumbnail = req.body.thumbnail
    await producto.modifById(id, productoMod)
    res.send('Producto Modificado')

})

// Elimina el producto segun su ID

routerProductos.delete('/:id', async (req, res) => {

    const { id } = req.params
    await producto.deleteById(id)
    res.send('Producto eliminado')

})

// Carga de Routers

app.use('/api/productos', routerProductos)

/* ---------------------------------------------------*/
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
