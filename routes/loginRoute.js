require('dotenv').config()
const {Router} = require('express');
const router = Router();
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const MongoAtlasConnnection = require('../config/mongooseConnectionAtlas')
const loginAccess = new MongoAtlasConnnection()

const session = require('express-session')
router.use(session({
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions?retryWrites=true&w=majority`, mongoOptions: advancedOptions}),
    secret: 'algo',
    resave: false,
    saveUninitialized: false
}))


router.get('/login', async (req, res) => {
    res.render('loginPage.ejs')
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body
    const login = await loginAccess.getLogin()
    const user = login.find(u => u.email === email && u.password === password)

    if (!user){
        return res.json('no existe')
    }

    req.session.user = user
    res.redirect('/api/productos')
    
})


module.exports = router;