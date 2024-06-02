const express = require("express");
const path=require("path")
const app=express();
const fs=require("fs")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    })
    
});

app.listen(3000,()=>{
    console.log("Server Started.");
});
