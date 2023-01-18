require('dotenv').config()
const {Router} = require('express');
const router = Router();
const MongoStore = require('connect-mongo')
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

const MongoAtlasConnnection = require('../config/mongooseConnectionAtlas')
const loginAccess = new MongoAtlasConnnection()

const session = require('express-session')
router.use(session({
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions?retryWrites=true&w=majority`, mongoOptions: advancedOptions}),
    secret: 'algo',
    resave: false,
    saveUninitialized: false
}))


const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

passport.use('login', new LocalStrategy(async (username, password, done) => {
    const login = await loginAccess.getLogin()
    const user = login.find(u => u.username === username)
    if (!user) {
        return done(null, false)
    }
    if (user.password !== password) {
        return done(null, false)
    }
    return done(null, user)
}))
passport.serializeUser(function (user, done){
    done(null, user.username)
})
passport.deserializeUser(async function (username,done){
    const user = await loginAccess.getLogin()
    const userSelected = user.find(u=>u.username === username)
    done(null, userSelected)
})

router.use(passport.initialize())
router.use(passport.session())


router.get('/login', async (req, res) => {
    res.render('loginPage.ejs')
});

router.post('/login', passport.authenticate('login', {failureRedirect: '/failedlogin', successRedirect: '/api/productos'}))

const isAuth = (req, res, next)=>{
    if (req.isAuthenticated()){
            next()
    }else{
            res.redirect('/login')
    }
}
router.get('/api/productos',isAuth)

router.get('/failedlogin',(req, res)=>{
    res.json('error')
})


module.exports = router;