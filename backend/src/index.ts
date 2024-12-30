import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.post('/compile', async (req, res) => {
  // Implémentation de la compilation
});

io.on('connection', (socket) => {
  console.log('Client connected');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});