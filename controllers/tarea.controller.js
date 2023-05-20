const tareaModel = require ('../models/tareas')
const create = async (req, res)=> {

    const { nombre } = req.body
    console.log(req.body)
    const email =  req.email
    const nuevaTarea = new tareaModel({ nombre, creador: email })
    console.log(nuevaTarea)
    await nuevaTarea.save()

    res.status(200).json(
        {
            ok: true,
            msg: "tarea creada",
            tarea: nuevaTarea
        }
    )
}

const readTarea = async(req, res, next)=> {

    const email = req.email;
    tareaModel.find({creador: email}).sort({createAt: -1})
    .then(tareas => res.status(200).json({
        tareas: tareas
    }))
    .catch(next)
}

const updateTarea = async(req, res, next)=>{

    const { id } = req.params;
    const { nombre } = req.body

    tareaModel.findByIdAndUpdate(id,{nombre: nombre}, {new: true})
    .then(tarea => res.status(200).json(
        {
            tarea: tarea
        }
    )).catch(next)
    // try {
    //     const tarea = await tareaModel.findByIdAndUpdate(id,{nombre: nombre}, {new: true})
    //     console.log(tarea);
    //     return res.status(200).json(
    //         {
    //             tarea: tarea
    //         }
    //     )

    // }
    // catch(error){
    //     return res.status(400).json(
    //         {
    //             msg: "fallo al actualizar"
    //         }
    //     )
    // }
}

const deleteTarea = (req, res, next)=>{

    const { id } = req.params;

    tareaModel.findByIdAndDelete(id)
    // tareaModel.findOne( { _id: id })
    .then( tarea => {
        // tareaModel.deleteOne({_id: id})
        res.status(200).json({
            msg: "tarea borrada"
        }
    )})
    .catch(next)


    // console.log(id)
    // const { nombre } = req.body
    // tareaModel.findOne({_id: id})
    // .then(tarea =>{
    //     console.log(tarea);
    //     if (tarea!=null){
    //         console.log("hola")
    //         tareaModel.deleteOne({ _id: id })
    //         res.status(200).json({
    //             msg: "tarea borrada"
    //         })
    //     } 
    //     else throw new Error("No existe ese registro")
    // }).catch(next) 


    // .then(
    //     res.status(200).json(
    //     {
    //         msg: "tarea brorrada"
    //     }
    // )).catch(next)
}

module.exports= {
    create,
    readTarea,
    updateTarea,
    deleteTarea
}