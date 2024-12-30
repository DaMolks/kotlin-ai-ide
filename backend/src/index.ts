import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { KotlinCompiler } from './services/compiler';
import { KotlinExecutor } from './services/executor';
import { AIService } from './services/ai-service';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const compiler = new KotlinCompiler();
const executor = new KotlinExecutor();
const aiService = new AIService();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Server running' });
});

app.post('/compile', async (req, res) => {
  const { code } = req.body;
  const tempFile = path.join(__dirname, '../temp', `temp_${Date.now()}.kt`);

  try {
    await fs.mkdir(path.join(__dirname, '../temp'), { recursive: true });
    await fs.writeFile(tempFile, code);
    const result = await compiler.compile(code, tempFile);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, output: error.message });
  } finally {
    try { await fs.unlink(tempFile); } catch {}
  }
});

app.post('/run', async (req, res) => {
  const { code } = req.body;
  const tempFile = path.join(__dirname, '../temp', `temp_${Date.now()}.kt`);

  try {
    await fs.mkdir(path.join(__dirname, '../temp'), { recursive: true });
    await fs.writeFile(tempFile, code);
    const result = await executor.execute(tempFile);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, output: error.message });
  } finally {
    try { await fs.unlink(tempFile); } catch {}
  }
});

app.post('/complete', async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await aiService.getCompletion(prompt);
    res.json({ success: true, completion });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('compile', async (data) => {
    const result = await compiler.compile(data.code, data.filePath);
    socket.emit('compile-result', result);
  });

  socket.on('run', async (data) => {
    const result = await executor.execute(data.filePath);
    socket.emit('run-result', result);
  });

  socket.on('complete', async (data) => {
    const completion = await aiService.getCompletion(data.prompt);
    socket.emit('completion-result', completion);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});