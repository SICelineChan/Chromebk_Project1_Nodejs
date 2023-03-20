const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date().toLocaleString()
    }

})

module.exports = mongoose.model('Blog', blogSchema)