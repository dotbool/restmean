
//npm run dev => inicia en development
//nodemon para qu se reinicie cada vez que hacemos cmabios
const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config();


const authRouter = require('./routes/auth');
const taskRouter = require('./routes/tareas');

const conn = require("./db/config");
conn()
//la función  use nos permite invocar middlewares
// si se intenta accdeder dese un navengador ("/"), que use la función 
//__dirname -> obtiene el path de la app en el servidor
// app.use("/", express.static(__dirname + "/public"))
app.use(express.json())

// let corsOptions = {
//     origin : ['http://localhost:4200'],
//  }
let corsOptions = {
    origin : ['https://babwfzkf.lucusprueba.es/nodosa'],
 }
app.use(cors(corsOptions))
// app.use(conn)
// conn.then(data => console.log('conectado'))
//todo lo que llame al puerto 3000 pasará por el middleware auth
app.use('/auth', authRouter)

app.use('/tareas', taskRouter)
app.use(function(err, req, res, next) {

    // const { status } = res.status

    // switch(status){
    //     case 401: 
    //         status: 401
    // }
    return res.status(401).json(
        {
            error: err.message == "invalid signature" ? "firma no válida": err.message
        })
  });


app.listen(process.env.PORT, ()=>{
    console.log("corriendo en puerto "+ process.env.PORT);
})
// app.listen()

//COMO NO SABEMOS QUE PUERTO NOS DARÁ NUESTRO HOSTING, DECLARAMOS VARIABLES DE ENTORNO
//PARA ELLO: 1 INSTALAMOS DOTENV CON --> npm install dotenv
//2-< En la raíz del proyecto creamos nuevo archivo llamado '.env'
//3-> Creamos una variable de entorno, en mayúsculas, llamada por ejemplo, PORT y le asignamos el puerto que sea
//4-> tenemos que importar el archivo recién creado para que lea las variables de entorno-> require('dotenv').config()
//3. En la función use , como primer argumento, process.env.PORT



// RUTAS
// 1. CREAMOS CARPETA LLAMADA ROUTES

// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();

