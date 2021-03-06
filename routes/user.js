const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/', async(req, res)=> {
    const users = await User.find()
    res.send(users)
})

router.get('/:id', async(req, res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).send('No hemos encontrado un usuario con ese ID')
    res.send(user)
})

router.post('/', [
    check('name').isLength({min: 3}),
    check('email').isLength({min: 3})
],async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        isCustomer: req.body.isCustomer
    })
    const result = await user.save()
    res.status(201).send(result)
})



router.put('/:id', [
    check('name').isLength({min: 3}),
    check('email').isLength({min: 3})
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const user = await User.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.email,
        isCustomer: req.body.isCustomer
    },
    {
        new: true
    })
    if(!user){
        return res.status(404).send('El usuario con ese ID no esta')
    }
    res.status(204).send()
})



router.delete('/:id', async(req, res)=>{



    const user = await User.findByIdAndDelete(req.params.id)



    if(!user){

        return res.status(404).send('El user con ese ID no esta, no se puede borrar')

    }



    res.status(200).send('usuario borrado')



})



module.exports = router