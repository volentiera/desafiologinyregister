const {Router} = require('express');
const router = Router();

const MongoAtlasConnnection = require('../config/mongooseConnectionAtlas')
const loginAccess = new MongoAtlasConnnection()

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
async function getLogin(){
    const login = await loginAccess.getLogin()
    return login
}
passport.use('register',new LocalStrategy({
    passReqToCallback: true
},async (req, username, password, done)=>{
    const user = await getLogin()
    console.log(user)
    const userObtained = user.find(u => u.email === username)
    
    if (userObtained){
        return done('usuario registrado')
    }
    const newUser = {
        email: username,
        password
    }
    await loginAccess.insertLogin(newUser)
    return done(null, newUser)
}))

passport.serializeUser(function (user, done){
    done(null, user.username)
})
passport.deserializeUser(async function (username,done){
    const user = await getLogin()
    const userSelected = user.find(u=>u.email === username)
    done(null, userSelected)
})

router.use(passport.initialize())
router.use(passport.session())



router.get('/register', async(req,res)=>{
    res.render('registerPage.ejs')
})
router.post('/register', passport.authenticate('register',{failureRedirect: '/failedregister', successRedirect:'/'}));

router.get('/failedregister',(req, res)=>{
    res.json('error')
})
module.exports = router;