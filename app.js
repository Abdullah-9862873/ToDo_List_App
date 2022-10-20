
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


let items = ["But Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/",function(req, res){
    let today = new Date();

    let options = {
        weekday : "long",
        day : "numeric",
        month: "long",
    };

    day = today.toLocaleDateString("en-US", options);

    res.render("list.ejs", {listTitle : day, newListItems : items});
})

app.post("/", function(req, res){
    let item = req.body.newItem;

    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function(req, res){
    res.render("list.ejs", {listTitle : "Work", newListItems : workItems});
})

app.get("/about", function(req, res){
    res.render("about.ejs");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})