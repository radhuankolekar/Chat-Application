const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`✅ New user connected: ${socket.id}`);

  // When user sends message
  socket.on('chat message', (data) => {
    io.emit('chat message', { id: socket.id, msg: data });
  });

  // When user disconnects
  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
