const mongoose = require("mongoose")
const marked = require("marked")
const slugify = require("slugify")
const createDomPurify = require("dompurify")
const { JSDOM } = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date().toLocaleString()
    },
    slug: { 
        type: String,
        required: true,
        unique: true 
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

blogSchema.pre("validate", function(nextBlog){
    
    if(this.title){
        this.slug = slugify(this.title, { lower:true, strict: true })
    }
    if(this.content){
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.content))
        
    }
nextBlog()
})

module.exports = mongoose.model('Blog', blogSchema)