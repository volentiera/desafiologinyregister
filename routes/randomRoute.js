const {Router} = require('express');
const router = Router();
const {fork} = require('child_process')

//http://localhost:8081/api/randoms?cant=1000

router.get("/api/randoms", (req, res) => {
    const cant = req.query.cant || 10000;
    const child = fork("./utils/getRandom.js");
    child.send(cant);
    child.on("message", (msg) => {
        res.send(msg);
    });
    child.on("exit", (code) => {
        console.log("Se ha cerrado el proceso", code);
    });
});

module.exports = router;