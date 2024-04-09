const express = require("express");
const bodyParser = require("body-parser")
const ejs = require('ejs');
const { dirname } = require("path");

const app = express();
app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let posts = []

app.get("/home", (req,res)=>{
    let shortenedText
    for (let i=0;i<posts.length;i++){
        if (posts[i].blog.length>=80){
            shortenedText = posts[i].blog.slice(0,80);
        }
    }
    console.log(shortenedText);
    res.render("index", {homePagePosts:posts, previewText:shortenedText});
})
app.get("/home/posts/:postTitle", (req,res)=>{
    for (let i=0;i<posts.length;i++){
        if(req.params.postTitle.toLocaleUpperCase() == posts[i].title){
            res.render("my_blogs", {
                postTitle: posts[i].title ,
                postBlog: posts[i].blog
            })
        }
        
    }
    
})
app.get("/error",(req,res)=>{
    res.render("error");
})
app.post("/posts", (req,res)=>{
    let search = req.body.searchBar;
    for (let i=0;i<posts.length;i++){
        if( search.toUpperCase() == posts[i].title){
            res.render("my_blogs", {
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
    res.send(`Hello MR.${fname} ${lname}`); // render a success signup/in ejs page

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
    res.redirect("/home");
})
app.get("/my-blogs", (req,res)=>{
    res.render("my_blogs")
})

app.listen(3000, ()=>{
    console.log("Live at 127.0.0.1:3000, press ctrl+c to terminate ...");
})