const express= require('express')
const AsyncHandler = require('express-async-handler')
exports.t = AsyncHandler(async(req, res, next) => {
    res.render('slider')

})
