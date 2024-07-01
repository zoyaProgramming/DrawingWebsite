const express  = require('express')
const Router = express.Router();
const testController = require('../controllers/test.js')
const saveController = require('../controllers/save_controllers.js')
Router.get('/', (req, res, next) => {
    res.redirect('/drawingapp')
})
module.exports = Router