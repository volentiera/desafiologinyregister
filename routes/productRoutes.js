
const {Router} = require('express');
const router = Router();

const MongoConnnection = require('../config/mongooseConection')
const productsAccess = new MongoConnnection()
const MongoConnnectionChat = require('../config/mongooseConectionChat')
const chatAccess = new MongoConnnectionChat()


const isAuth = (req, res, next)=>{
        if (req.isAuthenticated()){
                next()
        }else{
                res.redirect('/login')
        }
}

router.get('/api/productos', isAuth, async (req, res) => {
        const products = await productsAccess.getProducts()
        const messages = await chatAccess.getMessages()
        const jsScriptMain = 'public/main.js'
        return res.render('index', {products, messages, jsScriptMain });
})


module.exports = router;