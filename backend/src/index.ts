import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { KotlinCompiler } from './services/compiler';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const compiler = new KotlinCompiler();

app.use(express.json());

app.post('/compile', async (req, res) => {
  const { code } = req.body;
  const tempFile = path.join(__dirname, '../temp', `temp_${Date.now()}.kt`);

  try {
    await fs.mkdir(path.join(__dirname, '../temp'), { recursive: true });
    await fs.writeFile(tempFile, code);
    const result = await compiler.compile(code, tempFile);
    await fs.unlink(tempFile);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, output: error.message });
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('compile', async (data) => {
    const result = await compiler.compile(data.code, data.filePath);
    socket.emit('compile-result', result);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});