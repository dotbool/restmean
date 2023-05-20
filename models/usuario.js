const { Schema, model }  = require('mongoose')

const usuario = new Schema(
    {
        username: {
            type: String,
            require: true
        },
        email: { 
            unique: true,
            type: String,
            require: true
        }, 
        password: {
            type: String,
            require: true
        }
    },
)

module.exports=model('Usuario', usuario)