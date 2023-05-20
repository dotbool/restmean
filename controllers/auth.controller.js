const usuarioModel = require("../models/usuario");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const register = async (req, res) => {

    const { email, password, username } = req.body
    let response;
    let usuario = await usuarioModel.find({ email: email })
    if (usuario.at(0)) {
        console.log(usuario.at(0).email, "usuarioemail en if");
        response = res.status(501).json({
            ok: false,
            msg: "Ese correo ya existe",
            usuario: usuario[0].email
        })
    }
    else {
        try {
            //creo que el new asigna un id pero no es salvado aún
            const nuevoUsuario = new usuarioModel({ username, email, password })
            const salt = bcrypt.genSaltSync(12);
            nuevoUsuario.password = bcrypt.hashSync(password, salt);

            const payload = {
                email: nuevoUsuario.email,
                id: nuevoUsuario.id
            }

            console.log(payload);
            // jwt.sign(payload, process.env.SECRETA, (error, token) => {
         
            // })

            let token = jwt.sign(payload, process.env.SECRETA, { expiresIn: 3600000, algorithm: 'HS256' });
                 
            await nuevoUsuario.save()
            response = res.status(200).json({
                email: email,
                username: username,
                msg: "usuario creado",
                token: token,
                id: nuevoUsuario.id
            })

        }
        catch (error) {
            console.log(error.code, "error")
            response = res.json({
                msg: error.code == 11000 ? "El el mail ya existe" : "Ocurrió un error al crear",
                error: error.code
            })
            console.log(error);
        }
    }
    return response;
}


const login =  async(req, res) => {

    const { email, password } = req.body;

    let response;

    const usuario = await usuarioModel.findOne({ email: email })
    const passwordValid = usuario ? await bcrypt.compare(password, usuario.password): false;
    console.log(passwordValid);
    if (passwordValid) {

        const payload = {
            email: usuario.email,
            id: usuario.id
        }

        let token = jwt.sign(payload, process.env.SECRETA, { expiresIn: 3000600, algorithm: 'HS256' });
        response = res.status(200).json(
            {
                msg: `Bienvenido ${usuario.email}`,
                email: usuario.email,
                id: usuario.id,
                token: token
            }
        )
    }
    else {
        response = res.status(401).json({
            ok: false,
            msg: "Credenciales inválidas",
        })
    }


//    console.log(usuario);
 
//     if (!usuario) {
//         response = res.status(401).json({
//             ok: false,
//             msg: "Credenciales inválidas",
//             usuario: usuario[0].email
//         })
//     }
//     else {
//         const passwordValid = await bcrypt.compare(password, usuario.password)
//         if (passwordValid) {

//             const payload = {
//                 email: usuario.email
//             }

//             let token = jwt.sign(payload, process.env.SECRETA, { expiresIn: 3600, algorithm: 'HS256' });
//             response = res.status(200).json(
//                 {
//                     msg: `Bienvenido ${usuario.email}`,
//                     email: usuario.email,
//                     token: token
//                 }
//             )
//         }

//     }
    return response;
};

module.exports = {
    login,
    register
}
