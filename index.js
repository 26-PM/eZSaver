const express = require("express");
const path=require("path")
const app=express();
const fs=require("fs")

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",function(req,res){
    fs.readdir(`./files`,function(err,files){
        if (err) {
            return res.status(500).send("Error reading files directory.");
        }

        const tasks = files.map(file => {
            const filePath = path.join(__dirname, "files", file);
            const details = fs.readFileSync(filePath, "utf8");
            const title = path.basename(file, ".txt");
            return { title, details };
        });

        res.render("index", { tasks });
        // res.render("index",{files:files});
    })
     
    
})

app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){
        res.redirect("/");
    })
});

app.listen(3000,()=>{
    console.log("Server Started.");
});
