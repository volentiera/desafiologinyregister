para abrir el server con nodemon en modo fork:
nodemon server.js 8080 fork

para abrir el server con nodemon en modo cluster:
nodemon server.js 8080 cluster

para abrir el server con forever en modo fork:
forever start server.js 8080 fork 

para abrir el server con forever en modo cluster:
forever start server.js 8080 cluster

para listar los procesos en forever
forever list

para detener proceso en forever
forever stop server.js

para listar los procesos del sistema operativo
tasklist

para abrir el server con pm2 en modo fork en modo escucha:
pm2 start server.js --name="Server1" --watch -- 8081 fork

para abrir el server con pm2 en modo cluster en modo escucha:
pm2 start server.js --name="Server2" --watch -- 8081 cluster

para detener proceso en pm2
pm2 delete Server1 Server2

para listar procesos en pm2
pm2 list