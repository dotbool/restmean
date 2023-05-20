//desestructuramo el objeto express y obtenemos sólo la variable router
//se la asignamos a la constante authrouter
//la exportamos ( y en auth podemos llamarla ->  app.use('/auth', authRouter)
const { Router } = require('express');
const { login, register } = require('../controllers/auth.controller');
const authRouter = Router();

authRouter.post('/login', login)
authRouter.post('/register', register)

module.exports = authRouter;