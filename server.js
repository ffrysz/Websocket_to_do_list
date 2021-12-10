const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();
const tasks = [{
  id: '4b6898f3-b872-43bc-91d8-7b4f7690886d',
  name: 'Wynieść śmieci',
},
{
  id: 'ad7a3c8b-6efe-4c5e-ade2-9bfd363d4ca0',
  name: 'Wyprowadzić psa',
}
];

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
  socket.on('addTask', (taskObj) => {
    tasks.push(taskObj);
    socket.broadcast.emit('addTask', taskObj);
  });
  socket.on('removeTask', (taskId) => {
    const taskIndex = tasks.findIndex((el) => {
      return el.id === taskId;
    });
    tasks.splice(taskIndex, 1);
    socket.broadcast.emit('removeTask', taskId);
  });
});