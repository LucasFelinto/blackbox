import World from "./classes/World.js"
import Player from "./classes/Player.js"
import Bullet from "./classes/Bullet.js"

import express from "express"
import http from "http"
import socket from "socket.io"

const app = express()
const server = http.Server(app)
const io = socket(server)

app.use(express.static("public"))

app.get("/", (req, res) => res.sendFile("index.html"))

server.listen(3000);

const color   = Math.random() * 360
const players = {}
const keys    = {}
let   bullets = []

const world = new World(1000, 1000);


let move = function(playerId) {
  if (keys[playerId]['up']) players[playerId].y--
  if (keys[playerId]['down']) players[playerId].y++
  if (keys[playerId]['left']) players[playerId].x--
  if (keys[playerId]['right']) players[playerId].x++
}

let moveBullets = () => {
  let liveBullets = []
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += bullets[i].spdX
    bullets[i].y += bullets[i].spdY
    if (bullets[i].x > 0 && bullets[i].x < world.width && bullets[i].y > 0 && bullets[i].y < world.height ) {
      liveBullets.push(bullets[i])
    }
  }
  bullets = liveBullets
}

io.on('connection', socket => {
  players[socket.id] = new Player(40, 40, 0, 0, color)
  world.setPlayers = players
  console.log(players[socket.id])

  keys[socket.id] = {
    "up": false,
    "down": false,
    "left": false,
    "right": false
  }


  socket.on("mouseClick", data => {
    let mx = data.mouseX
    let my = data.mouseY
    let px = players[socket.id].x
    let py = players[socket.id].y
    let angleBullet = Math.atan( (my - py) / (mx - px))

    if (mx - px < 0) {
      angleBullet -= Math.PI
    }

    const startX = px + 25
    const startY = py + 25
    const speedX = Math.cos(angleBullet) * 10
    const speedY = Math.sin(angleBullet) * 10

    const bullet = new Bullet(50, 50, startX, startY, color, speedX, speedY, socket.id)
    bullets.push(bullet)
  })

  socket.on("mouseMove", data => {
    let mx = data.mouseX;
    let my = data.mouseY;
    let px = players[socket.id].x + 20;
    let py = players[socket.id].y + 20;
    let angle = 180 * Math.atan(  (my - py) / (mx - px) ) / Math.PI;
    if (mx - px < 0) {
      angle -= 180;
    }
    players[socket.id].ang = angle;
  });

  socket.on("disconnect", data => {
    delete players[socket.id]
    socket.broadcast.emit('players', players)
  })

  socket.on("down", data => {
    keys[socket.id][data] = true
  })

  socket.on("up", data => {
    keys[socket.id][data] = false
  })

  setInterval(() => {
    move(socket.id)
    moveBullets()

    socket.broadcast.emit('players', players)
    socket.broadcast.emit('bullets', bullets)
  }, 20)

});
