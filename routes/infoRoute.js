
const {Router} = require('express');
const router = Router();
const os = require('os')

//para mostrar argumentos ejecutar: nodemon server.js <arg1> <arg2> <arg3>
const args = process.argv.slice(2);
const nroCPUs = os.cpus().length;

const info = {
    processid: `ID del proceso: ${process.pid}`,
    nodeversion: `Version node.js: ${process.version}`,
    system: `Sistema operativo: ${process.platform}`,
    rss: `Memoria utilizada: ${Math.round((process.memoryUsage().rss/1024)/1024)} MB`,
    dirname: `Ruta del proyecto: ${process.cwd().replace(/\\/g, '/')}`,
    args: `Argumentos: ${args}`,
    execpath: `Ruta ejecucion del entorno: ${process.execPath.replace(/\\/g, '/')}}`,
    cpus: `Numero cpus: ${nroCPUs}`
}
const info2 = [info.args, info.dirname, info.nodeversion , info.processid, info.rss, info.system, info.execpath]

router.get('/info', async (req, res) => {
    res.send(info)
})


module.exports = router;