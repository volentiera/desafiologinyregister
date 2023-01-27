const express = require('express')
const {Router} = require('express');
const router = Router();
const app = express()
const {Server: IOServer} = require('socket.io')
const http = require('http');
const httpServer = http.createServer(app)
const io = new IOServer(httpServer)

const {getProducts} = require('../controllers/products')
const {getMessages} = require('../controllers/messages')

io.on('connection', async (socket) => {
        console.log('New user connected. Socket ID : ', socket.id);

        socket.emit('products', await getProducts());

        socket.on('update-product', async product => {

                await insertProduct(product)
                io.sockets.emit('products', await getProducts())
        })

        socket.emit('messages', await getMessages())

        socket.on('update-message', async message => {
                await insertMessage(message)
                io.sockets.emit('messages', await getMessages());
        })
        socket.on('disconnect', () => {
                console.log('User was disconnected');
        });
})

router.get('/api/productos', async (req, res) => {
        const products = await getProducts()
        const messages = await getMessages()
        const jsScriptMain = 'public/main.js'
        return res.render('index', {products, messages, jsScriptMain });
        
})


module.exports = router;