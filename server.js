const express = require("express");
const bodyParser = require("body-parser")
const ejs = require('ejs');
const { dirname } = require("path");

const app = express();
app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let posts = []

app.get("/", (req,res)=>{
    
    res.render("home", {homePagePosts:posts});
})
app.get("/posts/:postTitle", (req,res)=>{
    for (let i=0;i<posts.length;i++){
        if(req.params.postTitle.toLocaleUpperCase() == posts[i].title){
            res.render("my-blogs", {
                postTitle: posts[i].title ,
                postBlog: posts[i].blog
            })
        }
        
    }
    
})

app.post("/", (req,res)=>{
    // search available to new written posts/not the already written in html.
    let search = req.body.searchBar;
    for (let i=0;i<posts.length;i++){
        if( search.toUpperCase() == posts[i].title){
            res.render("my-blogs", {
                postTitle: posts[i].title ,
                postBlog: posts[i].blog
            })
        }
        else{
            res.redirect("/error");
        }
        
    }
})
app.get("/signup", (req,res)=>{
    res.render("signup")
})
app.post("/signup", (req,res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    res.render('success', {userName:fname.toUpperCase()}); // render a success signup/in ejs page

})
app.get("/new-blog", (req,res)=>{
    res.render("new_blog")
})
app.post("/new-blog", (req,res)=>{
    let title = req.body.title.toUpperCase();
    let blog = req.body.blog;
    let post = {
    title : title,
    blog : blog
    }
    posts.push(post)

    console.log(posts);
    // res.send(`<h1>${title}</h1><p>${blog}</p>`);
    res.redirect("/");
})
/*

// add my-blog page for user written/liked blogs.

app.get("/my-blogs", (req,res)=>{
    res.render("my_blogs", {
        postTitle:posts.title,
        postBlog:posts.
    })
})
*/ 
// add header / footer for search error
app.get("/error",(req,res)=>{
    res.render("error");
})

app.listen(3000, ()=>{
    console.log("Live at 127.0.0.1:3000, press ctrl+c to terminate ...");
})