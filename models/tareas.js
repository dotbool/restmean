const { Schema, model } = require('mongoose')

const Tarea = new Schema(
    {
        nombre:{
            type: String,
            require: true,
            trim: true
         },
        creador:{
            type: Schema.Types.String,
            ref: "Usuario"
        },
        createAt:{
            type: Date,
            default: Date.now()
        }
    }
)

module.exports = model('Tarea', Tarea)