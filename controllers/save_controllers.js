const express= require('express')
const{body, validationResult} = require('express-validator')
const AsyncHandler = require('express-async-handler')
const saveModel = require('../models/save_model')
exports.index = AsyncHandler(async(req, res, next) => {
    res.redirect('/drawingapp')
})

exports.main = AsyncHandler(async(req, res, next) => {
    res.render('index', {
        drawing_data: null,
        id: ""
    })
})

exports.get_save_slots= AsyncHandler(async(req, res, next) => {
    console.log('fetch')
    const AllSaveSlots = await saveModel.find().exec()
    try{
        
        const uri = "http://localhost:3000/?x=шеллы"
        
        res.send(encodeURIComponent(JSON.stringify(AllSaveSlots)))
    }
    catch(e) {
        console.log('fetch')
        console.log(`Error loading: ${e}`)
    }
})

exports.get_save= AsyncHandler(async(req, res, next) => {
    
})

exports.post_save_confirmation = [ //  not in use any more
    body('drawing_data', "issue with the body"),
    body('method', "meth"),
    
    body('id', 'id must be valid mongo id'),

    AsyncHandler(async(req, res, next) => {
        console.log('confirming')
        const errors =  validationResult(req)
        if(!errors.isEmpty()){
            console.log('Error found! '+ errors)
            for(var error of errors.array()) {
                console.log(error)
            }
             res.render('index', {
                drawing_data: req.body.drawing_data,
                errors: errors.array(),
                id: null
            }
            )
        }else{
            console.log('no errors yet...')
           console.log(req.body)
            const thingToRender = req.body.id.length===0?null: await saveModel.findById(req.body.id).exec()
            switch(req.body.method) {
                
                case 'GET' : 

                    console.log('GET (load something)')
                    if(thingToRender !== null) {
                        console.log('something to load found')
                        res.redirect(thingToRender.url)
                    } else {
                        console.log('item not found')
                        res.render('index', {
                            drawing_data: req.body.drawing_data,
                            id: null
                        })
                    }
                    break;
                case "POST":
                    //save or update
                    console.log('posting(saving or updating)')
                    res.render('drawing_save_form.ejs', {
                        drawing_data: req.body.drawing_data,
                        id: req.body.id,
                        name: thingToRender===null?undefined:thingToRender.name
                    })
                    break;
                case 'submit': 
                    console.log('submitting')
                    const final = await saveModel.findById(req.body.id).exec()
                    res.redirect(thingToRender.id)
                    break;
                    
            }
        
        }
    })
]

exports.post_save = 
 [
    AsyncHandler(async(req, res, next) => {
        console.log('post_save')
       console.log(req.body)
        console.log()
        const errors = validationResult(req);
        const draw = new saveModel({
            name: req.body.name,
            image_data: req.body.drawing_data
        })
        if(!errors.isEmpty()) {
            console.log(errors.array())
            console.log("errors found")
            res.render('drawing_save_form.ejs', {
                title: req.body.name,
                drawing_data: req.body.drawing_data,
                name:req.body.name,
                id: '', 
                errors: errors.array()
            }) 
            return;
        }

        else {
            console.log('no errors found in ' + req.body.name)
            const newSave = await draw.save();
            res.send(encodeURIComponent(newSave.image_data))
        }
    }
)]

exports.load = AsyncHandler(async(req, res, next) => {
    console.log(` loading: ${req.params.id}`)
    const drawing = await saveModel.findById(req.params.id).exec()
    console.log('hiiiii')
    if(drawing == null){
        console.log('drawing data not found')
        res.render('index', {
            id: null,
            drawing_data: null
        })
        return;
    }
    console.log('drawing data found')
    res.send(encodeURIComponent(drawing.image_data))
    console.log('donene') //`drawingData=${drawing.image_data}`)
})
exports.post_update = AsyncHandler(async(req, res, next) => {
    const draw = saveModel.findById(req.params.id).exec()
    if(draw== null) {
        res.redirect('/')
        console.log('errors')
    } else{
        console.log('found')
        const newSave = new saveModel({
            name: req.body.name,
            image_data: req.body.drawing_data,
            _id :req.params.id
        })
        try {
            console.log('attempting to update....')
            const newOne = await saveModel.findByIdAndUpdate(req.params.id, newSave, {})
            console.log(newOne)
            

        } catch( e) {

            console.error(e)
            res.redirect('/')
        }
    }

})

exports.get_load = AsyncHandler(async(req,res,next)=>{
    const all_available = await saveModel.find().exec()
    res.render('load_form.ejs', {
        all_available: all_available
    })
})

exports.get_id= AsyncHandler(async(req, res, next) => {
    const anyMatches = await saveModel.find({image_data: req.body.drawing_data}).exec()
    res.send(encodeURIComponent(anyMatches))
})