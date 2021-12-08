const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();
const tasks = [];

app.use(cors());

const server = app.listen(8000, () => {
  console.log('Server is running...');
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server, {
  cors: true
});

io.on('connection', (socket) => {
  socket.emit('updateData', tasks);
  socket.on('addTask', (taskName) => {
    tasks.push(taskName);
    socket.broadcast.emit('addTask', taskName);
  });
  socket.on('removeTask', (taskIndex) => {
    tasks.splice(taskIndex, 1);
    socket.broadcast.emit('removeTask', taskIndex);
  });
});