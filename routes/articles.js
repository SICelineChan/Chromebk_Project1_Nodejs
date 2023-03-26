const express = require("express")
const router = express.Router()
const Blog = require('./../db/blog')
const mongoose = require("mongoose")
const methodOverride = require("method-override")

const url = process.env.MONGO_DB;
mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect('mongodb://127.0.0.1:27017/qulimes', {useNewUrlParser: true, useUnifiedTopology: true})

router.use(methodOverride("_method"))

router.get("/", async (req,res)=> {
    const articles = await Blog.find().sort({createdOn: "desc"})
    /*    const articles = [{
            title: "A day of sizzling heat!",
            createdOn: new Date().toLocaleString(),
            description: "The lush green surrounding a sandy mountain with simmering heat"
        }
    */
        res.render("articles/blogIndex", {articles: articles})
    })
router.get("/newblog", (req, res) => {
    res.render("articles/newblog", {blog: new Blog()})
})

router.get("/edit/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render("articles/edit", {blog: blog})
})

router.get("/:slug", async (req, res) => {
    const blog = await Blog.findOne({slug: req.params.slug})
    if(blog == null) res.redirect("/")
    res.render("articles/show", { blog : blog})
})

router.post("/",async(req, res, next) => {
    req.blog = await new Blog()
    next()
}, saveBlogAndRedirect("new"))

router.put("/:id", async (req, res, next) => {
    req.blog = await Blog.findById(req.params.id)
    next()
}, saveBlogAndRedirect("edit"))

router.delete("/:id", async(req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.redirect("/articles")
})

function saveBlogAndRedirect(path){
    return async (req, res) => {
        let blog = req.blog
        blog.title = req.body.title
        blog.description = req.body.description
        blog.content = req.body.content
    try {
        blog = await blog.save()
        res.redirect(`/articles/${blog.slug}`)
    } catch (err) {
        res.render(`articles/${path}`, {blog: blog})
        } 
    }   
}




module.exports = router
