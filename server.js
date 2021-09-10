
const express = require("express");
const app = express();

const httpServer = require("http").Server(app);

const { Server } = require("socket.io");
const io = new Server(httpServer);

io.on("connection", function(socket) {
    console.log("new connection");
    let timerId = setInterval(function() {
        socket.emit("free-rect", Math.random() * 100,  + Math.random() * 100, 100 + Math.random() * 1000, 100 + Math.random() * 1000)
    });

    socket.on("disconnect", function() {
        clearInterval(timerId);
    });

    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });
});

io.on("error", console.log);

app.use(express.static(__dirname));

app.listen(8079, function() {
    console.log("Listening at 8079");
});