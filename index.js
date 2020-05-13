const mongoose=require('mongoose')
const express = require('express')
const app = express()
const car=require('./routes/car')
const user=require('./routes/user')
app.use(express.json())
app.use('/api/cars/',car)
app.use('/api/user/',user)
const port =process.env.PORT || 3003
app.listen(port, ()=> console.log('Escuchando Pueerto:' + port))

mongoose.connect('mongodb://localhost/carsdb',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Conectado correctamente a MongoDB'))
    .catch(()=> console.log('Error al conectarse a MongoDB'))

