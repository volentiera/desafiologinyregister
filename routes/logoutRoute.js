const {Router} = require('express');
const router = Router();



router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.render('logoutPage.ejs')
})



module.exports = router;