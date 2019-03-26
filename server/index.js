const express = require("express");
const app = express();

const server = app.listen(8880, (err)=>{
  if(err){
    console.log(err);
    return false;
  }
  
  console.log("port 8880 is ready");
});

const io = require("socket.io")(server);

io.on("connection", (socket)=>{
  io.emit("user_connected");
  
  socket.on("typed_msg", (data)=>{
    console.log(data);
    io.emit("new_msg", data);
  })
});