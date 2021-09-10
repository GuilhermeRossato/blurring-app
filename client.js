const socket = require("socket.io-client")(
    "http://localhost:8079/",
    {
        rejectUnauthorized: false,
        transports: ['websocket']
    }
);

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});