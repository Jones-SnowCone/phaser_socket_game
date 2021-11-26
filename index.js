const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(_dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("disconnet", () => {
        console.log("user disconneted")
    })
})

server.listen(3000, () => {
    console.log(`listening on ${server.address().port}`);
});

