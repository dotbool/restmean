const mongoose = require('mongoose')
const conn = async()=>{
    try {
        await mongoose.connect(process.env.DB_CONECTION)
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        //donde va blog se refiere a la bbdd.  Si no existe la crea
    }
    catch(error){
        console.log(error);
    }

}
const conn2 = ()=> new Promise((resolve, reject)=>{
    resolve( mongoose.connect('mongodb+srv://boo:ngtowashib@cluster0.odn6rey.mongodb.net/?retryWrites=true&w=majority')),
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    reject("error")
})
module.exports = conn;