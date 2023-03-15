const express = require("express")
const router = express.Router()


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


router.get("/new", (req, res) => {
    res.render("articles/newblog")
})



module.exports = router
