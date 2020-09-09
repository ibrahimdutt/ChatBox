const express = require('express');
const app = express();

app.set('view engine', 'ejs');
const http = require('http').Server(app);
const io = require('socket.io')(http);



app.get('/', function(req,res){
     res.render('index');
});

io.sockets.on('connection', function(socket){
     
    socket.on('username', function(username){
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + " has joined the chat ..</i>")
    });   

    socket.on('disconnect', function(username){
        io.emit('is_online', '🔴 <i>' + socket.username + " has left the chat ..</i>")
    });

    socket.on('chat_message', function(message){
        io.emit("chat_message", "<strong>" + socket.username + " </strong>: " + message)
    });


});



const server = http.listen( 3000, function(){
    console.log("Server up on 3000");
});