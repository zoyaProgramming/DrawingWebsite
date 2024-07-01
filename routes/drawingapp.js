const express  = require('express')
const Router = express.Router();
const testController = require('../controllers/test.js')
const saveController = require('../controllers/save_controllers.js')
Router.use(function (req, res, next) {
    console.log('\n logging...')
    console.log('%s %s %s \n', req.method, req.url, req.path)
    next()
  })
Router.get('/', saveController.main)
Router.get('/save', saveController.get_save_slots)
Router.get('/load', saveController.get_load,   () => {console.log('Error getting load options')})
//Router.get('/test', saveController.test)
Router.post('/save', saveController.post_save)

Router.get('/check')
Router.post('/', saveController.post_save_confirmation, () => {console.log('Error getting post options')})
Router.get('/draw/:id', saveController.load,() => {console.log('Error getting load options')})
Router.post('/draw/:id', saveController.post_save_confirmation,   () => {console.log('Error getting load options')})
Router.post('/draw/:id/update', saveController.post_update,   () => {console.log('Error getting load options')})
Router.get('/:id', saveController.post_update,   () => {console.log('Error getting load options')})

//Router.post('/:id/update', saveController.get_update, () => {console.log('Error getting update options')})
module.exports = Router;    