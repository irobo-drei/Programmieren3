const Creature = require("./classes/creature.js")
const Gras = require("./classes/gras.js");
const FleischFresser = require("./classes/fleischfresser.js");
const RasenDestroyer = require("./classes/rasendestroyer.js");

let interValID
let gameStarted = false;

let objekteListe = [new FleischFresser(20, 20), new Gras(11, 10), new Gras(12, 10), new Gras(13, 10), new Gras(10, 11), new Gras(10, 12), new Gras(10, 13), new Gras(9, 10), new Gras(8, 10), new Gras(7, 10), new Gras(10, 9), new Gras(10, 8), new Gras(10, 7)];

const express = require("./node_modules/express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use(express.static("./client"));
app.get("/", function (req, res) {
  res.redirect("client.html");
})

const clients = [];

server.listen(3000, function () {
  console.log("Server runs on port 3000");

  io.on("connection", function (socket) {
    console.log("ws-connection client", socket.id);

    clients.push(socket.id);

    if (clients.length == 1 && !gameStarted) {
      //spiel startet
      initGame();
      console.log(matrix);
      //spielschleife starten
      interValID = setInterval(function () {
        updateGame();
      }, 1000);
      gameStarted = true;
    }

    socket.on("disconnect", function (reason) {
      console.log("client was disconnected - reason: ", reason);
      const foundIndex = clients.findIndex(id => id == socket.id);

      if (foundIndex >= 0) {
        clients.splice(foundIndex, 1);
      }

      if (clients.length == 0) {
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

    objekteListe.push(new RasenDestroyer(zeile, spalte))
  }

  for (let x = 0; x < objekteListe.length; x++) {
    objekteListe[x].selbstplatzierung();
  }
}

function updateGame() {
  for (let i = 0; i < objekteListe.length; i++) {
    objekteListe[i].spielzug();
  }

  console.log(objekteListe.length)
  zeichneMatrix();
}

function zeichneMatrix() {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix.length; y++) {
      //console.log(matrix[x][y])
      if (matrix[y][x] === 1) {
        fill("green")
        console.log(1)
      } else if (matrix[y][x] === 2) {
        fill("black")
        console.log(2)
      } else if (matrix[y][x] === 3) {
        fill("yellow")
        console.log(3)
      } else {
        fill("#cccb76")
        console.log(4)
      }
      rect(x * 10, y * 10, 10)
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

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function random(...args) {
  if (args.length === 0) {
      return Math.random();
  } else if (args.length === 1 && Array.isArray(args[0])) {
      return args[0][Math.floor(Math.random() * args[0].length)];
  } else if (args.length === 1 && typeof args[0] === 'number') {
      return Math.floor(Math.random() * args[0]);
  } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
      return Math.floor(Math.random() * (args[1] - args[0] + 1) - args[0]);
  } else {
      console.log(args);
      throw new Error('Invalid arguments');
  }
}

module.exports = {
  random: random,
}