const {Router} = require('express');
const router = Router();



router.get('/logout',(req,res)=>{
    req.logOut()
    res.render('logoutPage.ejs')
})



module.exports = router;