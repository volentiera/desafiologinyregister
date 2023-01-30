require('dotenv').config()

const os = require('os')
const cluster = require('cluster');
const modo = process.argv[3] || 'fork';
if (modo == 'cluster' && cluster.isPrimary) {
    const numCPUs = os.cpus().length;

    console.log(`Primary ${process.pid} is running`);
    console.log(`número de procesadores: ${numCPUs}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`worker ${worker.process.pid} died`, new Date().toLocaleString());
        cluster.fork();
    })
} else {
    const express = require('express')
    const app = express()

    const morgan = require('morgan');

    const routeProducts = require('./routes/productRoutes')
    const routeLogin = require('./routes/loginRoute')
    const routeRegister = require('./routes/registerRoute')
    const routeLogout = require('./routes/logoutRoute')
    const routeInfo = require('./routes/infoRoute')
    const routeRandom = require('./routes/randomRoute')

    const path = require('path');

    const {
        Server: IOServer
    } = require('socket.io')
    const http = require('http');
    const httpServer = http.createServer(app)
    const io = new IOServer(httpServer)

    const PORT = parseInt(process.argv[2]) || 8080

    require('./db/dbConnection')
    const sessionDBConnection = require('./db/sessionDBConnection')

    const {getProducts, insertProduct} = require('./controllers/products')
    const {getMessages, insertMessage} = require('./controllers/messages')

    const isAuth = require("./utils/auth")

    //middlewares

    app.use(morgan('dev'))
    app.use(express.urlencoded({
        extended: true
    }))
    app.use(express.json())

    app.use(sessionDBConnection)

    app.use(express.static(__dirname + '/public'))

    app.set('views', path.join(__dirname, './public/views'));
    app.set('view engine', 'ejs');

    //rutas
    app.use(routeProducts)
    app.use(routeLogin)
    app.use(routeRegister)
    app.use(routeLogout)
    app.use(routeInfo)
    app.use(routeRandom)


    app.get('/', isAuth, (req, res) => {
        res.redirect('/api/productos')
    })

    //socket
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

    //server
    const server = httpServer.listen(PORT, () =>
        console.log(
            `Server started on PORT http://localhost:${PORT} --${process.pid} -- at ${new Date().toLocaleString()}`
        )
    );

    server.on('error', (err) => {
        console.log('Error en el servidor:', err)
    })

}