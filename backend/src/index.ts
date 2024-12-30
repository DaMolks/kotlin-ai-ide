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
  const status = llm.getStatus();
  res.json(status);
});

app.post('/suggest', async (req, res) => {
  const { code } = req.body;
  try {
    const suggestion = await llm.getSuggestion(code);
    res.json({ suggestion });
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(500).json({ error: errorMessage });
  }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});