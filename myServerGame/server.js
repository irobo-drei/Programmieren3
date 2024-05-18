const Creature 
const Gras = require('./classes/gras.js');
const FleischFresser = require('./classes/fleischfresser.js');
const RasenDestroyer = require('./classes/rasendestroyer.js');

let interValID
let gameStarted = false;

const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static('./client'));
app.get("/", function(req, res){
    res.redirect('client.html');
})

const clients = [];

server.listen(3000, function(){
    console.log("Server runs on port 3000");

    io.on("connection", function (socket){
        console.log("ws-connection client", socket.id);

        clients.push(socket.id);

        if (clients.length == 1 && !gameStarted){
            //spiel startet
            initGame();
            console.log(matrix);
            //spielschleife starten
            interValID = setInterval(function(){
                updateGame();
            }, 1000);
            gameStarted = true;
        }

        socket.on("disconnect", function (reason){
            console.log("client was disconnected: reason -", reason);
            const foundIndex = clients.findIndex(id => id == socket.id);

            if(foundIndex >= 0){
                clients.splice(foundIndex, 1);
            }
            if(clients.length == 0){
                clearInterval(interValID);
                gameStarted = false;
                console.log("game stopped")
            }
        })
    })

    return matrix
});

//////Game settings

function initGame() {
  matrix = erstelleMatrix()
  
  for (let x = 0; x < 1; x++) {
    let zeile = 10 //randomNumber(0,50)
    let spalte = 10 //randomNumber(0,50)
    objekteListe.push(new rasenDestroyer(zeile,spalte))
  } 

  for (let x = 0; x < objekteListe.length; x++) {
    objekteListe[x].selbstplatzierung();
  }
}

function updateGame(){
    for (let i = 0; i < objekteListe.length; i++) {
        objekteListe[i].spielzug();
      }
      
      console.log(objekteListe.length)
      zeichneMatrix();
}

function zeichneMatrix(){
    for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix.length; y++) {
        //console.log(matrix[x][y])
        if (matrix[y][x] === 1) {
          fill("green")
        }else if(matrix[y][x] === 2){
          fill("black")
        }else if(matrix[y][x] === 3){
          fill("yellow")
        }else {
          fill("#cccb76")
        }
        rect(x*10,y*10,10)
      }
    }
  }
  
  function erstelleMatrix() {
    let matrix = [];
    for (let x = 0; x < 50; x++) {
      zeile = [];
      for (let y = 0; y < 50; y++) {
        zeile.push(3);
      }
      matrix.push(zeile);
    } 
    return matrix;
  }
  
  
  function randomNumber(min,max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  