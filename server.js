const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require('socket.io')(server, {cors: {origin:"*"}})

const mongoose = require("mongoose")
const DB = "mongodb+srv://hutum:_~z4FiRp_nTg6-4@cluster0.v8sh5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(DB, function(err, db){console.log('database connected'); 


app.get('/',function(req, res){
    res.sendFile('index.html',{root:__dirname})
});
server.listen(process.env.PORT || 3000, ()=>{
    console.log("server running");
});

const dataSchema = new mongoose.Schema({
    user_and_pass: { type : String , unique : true}

  })
  let info = db.collection('register');

io.on("connection", (socket)=>{
    socket.on("IP", (data)=>{
        console.log(data)
        let xy = data;
        info.insert({
            user_and_pass:xy})
        socket.broadcast.emit('show_ip', data )
    })
    socket.on("message", (data)=>{
        console.log(data)
    })
})


})
