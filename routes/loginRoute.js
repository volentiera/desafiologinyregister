require('dotenv').config()
const {Router} = require('express');
const router = Router();
const sessionDBConnection = require('../db/sessionDBConnection')
const {getLogin} = require('../controllers/login')

router.use(sessionDBConnection)


const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

passport.use('login', new LocalStrategy(async (username, password, done) => {
    const login = await getLogin()
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
    const user = await getLogin()
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