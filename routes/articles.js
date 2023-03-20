const express = require("express")
const router = express.Router()
const Blog = require('./../db/blog')
const mongoose = require("mongoose");

const url = process.env.MONGO_DB;
mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect('mongodb://127.0.0.1:27017/qulimes', {useNewUrlParser: true, useUnifiedTopology: true})

router.get("/newblog", (req, res) => {
    res.render("articles/newblog", {blog: new Blog()})
})

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if(blog == null) res.redirect("/")
    res.render("articles/show", { blog : blog})
})


router.get("/", async (req,res)=> {
const articles = await Blog.find().sort({createdOn: "desc"})

/*    const articles = [{
        title: "A day of sizzling heat!",
        createdOn: new Date().toLocaleString(),
        description: "The lush green surrounding a sandy mountain with simmering heat"
    },
    {   title: "Is a storm coming?",
        createdOn: new Date().toLocaleString(),
        description: "A little bit of wind and rain to break off that dry heat"

}]
*/

    res.render("articles/blogIndex", {articles: articles})
})

router.post('/',async(req, res) => {
    let blog = new Blog({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
    })
    try {
        blog = await blog.save()
        res.redirect(`/articles/${blog.id}`)
    } catch (err) {
        res.render('articles/newblog', {blog: blog})
        console.log(err)
    }
    await blog.save()
})




module.exports = router
