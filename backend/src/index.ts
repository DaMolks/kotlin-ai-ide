import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { LLMService } from './services/llm';
import { KotlinService } from './services/kotlin';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const llmService = new LLMService();
const kotlinService = new KotlinService();

io.on('connection', (socket) => {
  socket.on('prompt', async (data) => {
    const response = await llmService.processPrompt(data);
    socket.emit('llm-response', response);
  });

  socket.on('compile', async (data) => {
    const result = await kotlinService.compile(data);
    socket.emit('compile-result', result);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});