const express = require('express')

const app = express();

app.use(express.static("Programmieren2"));

app.get("/", function(req, res){
    //res.send("<h1>Hello World</h1>");
    res.redirect("index.html");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>");
});

app.get("/google", function(req, res){
    res.redirect('https://google.com');
});

app.get("/lol", function(req, res){
    res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

app.get("/search/:search", function(req, res){
    let search = req.params.search;
    res.redirect('https://www.google.com/search?q=' + search);
});

app.get("/*", function(req, res){
    res.send("404 Page not found");
});

app.listen(3000, function(){
    console.log("Example is running on port 3000")
});
