const {Router} = require('express');
const router = Router();

const MongoAtlasConnnection = require('../config/mongooseConnectionAtlas')
const loginAccess = new MongoAtlasConnnection()

const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

router.get('/register', async(req,res)=>{
    res.render('registerPage.ejs')
})
router.post('/register', async (req, res) => {
    const {email, password} = req.body
    const objectToSend = {
        email: email,
        password: password
    }
    await loginAccess.insertLogin(objectToSend)
    res.redirect('/login')
});


module.exports = router;