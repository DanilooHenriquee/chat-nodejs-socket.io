const express = require('express');
const http = require('http');
const { path, resolve } = require('path')

const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(resolve('./front-end/index.html'));    
});

const messages = [];

io.on('connection', socket => {
    console.log('A user connected 🌚');

    socket.emit('messages', messages);    

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (response) => {
        messages.push(response);
        
        socket.emit('messages', messages);
        socket.broadcast.emit('messages', messages);
    });
})

server.listen(3000, () => console.log('Server is running... 🐥🐣'));