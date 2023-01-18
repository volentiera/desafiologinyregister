
const {Router} = require('express');
const router = Router();

const MongoConnnection = require('../config/mongooseConection')
const productsAccess = new MongoConnnection()
const MongoConnnectionChat = require('../config/mongooseConectionChat')
const chatAccess = new MongoConnnectionChat()


router.get('/api/productos', async (req, res) => {
        const products = await productsAccess.getProducts()
        const messages = await chatAccess.getMessages()
        const jsScriptMain = 'public/main.js'
        return res.render('index', {products, messages, jsScriptMain });
})


module.exports = router;