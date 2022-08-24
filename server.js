const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require('socket.io')(server, {cors: {origin:"*"}})

app.get('/',function(req, res){
    res.sendFile('index.html',{root:__dirname})
});
server.listen(process.env.PORT || 3000, ()=>{
    console.log("server running");
});
io.on("connection", (socket)=>{
    socket.on("IP", (data)=>{
        console.log(data)
        socket.broadcast.emit('show_ip', data )
    })
    socket.on("message", (data)=>{
        console.log(data)
    })
})