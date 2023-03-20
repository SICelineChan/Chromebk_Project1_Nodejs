const express = require("express")
const router = express.Router()
const Blog = require('./../db/blog')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/qulimesBlog', {useNewUrlParser: true, useUnifiedTopology: true})

router.get("/",(req,res)=> {
    const articles = [{
        title: "A day of sizzling heat!",
        createdOn: new Date().toLocaleString(),
        description: "The lush green surrounding a sandy mountain with simmering heat"
    },
    {   title: "Is a storm coming?",
        createdOn: new Date().toLocaleString(),
        description: "A little bit of wind and rain to break off that dry heat"

}]

    res.render("articles/blogIndex", {articles: articles})
})

router.get("/newblog", (req, res) => {
    res.render("articles/newblog", {blog: new Blog()})
})



router.get("/:id", (req, res)=> {
res.send(req.params.id)

})

router.post('/',async(req, res) => {
    let blog = new Blog({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
    })
    try {
        await blog.save()
        res.redirect(`/articles/${blog.id}`)
    } catch (error) {
        res.render('articles/newblog', {blog: blog})
        console.log("Something was wrong!")
    }
    await blog.save()
})




module.exports = router
