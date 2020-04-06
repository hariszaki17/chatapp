const express = require('express')
const app =  express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = 3000

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
      socket.broadcast.emit('woyy')
    //   console.log('a user connected')
    socket.on('nickname', (msg_nick) => {
        let announce = 'user ' + msg_nick + ' has joined the chat'
      io.emit('nickname', announce)
      socket.on('chat message', (msg) => {
          let messageOut = msg_nick + ': ' + msg
        io.emit('chat message', messageOut)
      //   console.log('ini chat message', msg)
    })
    //   console.log('ini chat message', msg)
  })
    
      socket.on('disconnect', () => {
          console.log('user disconnected')
      })
  })
http.listen(PORT, () => {
    console.log('I love u ', PORT)
})