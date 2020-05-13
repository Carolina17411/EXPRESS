function date(req, res, next){
    console.log('Time: ',Date.now())
    //next es importante porque sino se queda como un congelado
    next()
}

module.exports= date