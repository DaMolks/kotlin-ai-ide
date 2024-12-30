import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { LLMService } from './services/llm-service';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const llm = new LLMService();

app.use(express.json());

app.get('/llm-status', (req, res) => {
  res.json({ status: llm.getStatus() });
});

app.post('/suggest', async (req, res) => {
  const { code } = req.body;
  try {
    const suggestion = await llm.getSuggestion(code);
    res.json({ suggestion });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});