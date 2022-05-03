const express = require('express')
const app = express()
const {Router} = express

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const { Contenedor } = require('./main');
const routerProductos = new Router()
const producto = new Contenedor('./public/productos.txt');

/* --------------------------------------------- */

routerProductos.get('/', async (req,res)=>{  
     
   res.send(await producto.getAll())
})

routerProductos.get('/:id',async (req,res)=>{
    const id =  parseInt(req.params)
    
    res.send(await producto.getById(id))
    
})

routerProductos.post('/',async (req,res)=>{    
    const {product} =  req.body    
    res.json(await producto.save(product))
})

routerProductos.delete('/:id',async (req, res) => {
    const id = parseInt(req.params.id);  
    res.send(await deleteById(id))
})
// Carga de Routers

app.use('/api/productos', routerProductos)

/* ---------------------------------------------------*/
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))