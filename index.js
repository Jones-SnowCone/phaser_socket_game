const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var players = {};

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("user connected");
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? "red" : "blue"
    };
    // send the players object to the new player
    socket.emit("currentPlayers", players);
    // update all other players of the new player
    socket.broadcase.emit("newPlayer", players[socket.id]);
    socket.on("disconnet", () => {
        console.log("user disconneted");
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit("disconnect", socket.id);
    });
});

server.listen(3000, () => {
    console.log(`listening on ${server.address().port}`);
});

