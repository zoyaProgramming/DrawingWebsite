const Mongoose = require('mongoose');
const Schema =  Mongoose.Schema
const DrawingSchema = new Schema({
    name: {type: String, required: true},
    image_data: {type: String}
})
DrawingSchema.virtual('url').get(function() {
    return `/drawingapp/draw/${this.id}`
});

module.exports = Mongoose.model("draws", DrawingSchema)
