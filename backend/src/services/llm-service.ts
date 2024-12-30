import { spawn } from 'child_process';
import path from 'path';

export class LLMService {
  private process: any;
  private initialized: boolean = false;
  private readonly modelPath = path.join(process.cwd(), '../codellama/models/codellama-7b.Q4_K_M.gguf');

  constructor() {
    this.initializeLLM();
  }

  private async initializeLLM() {
    try {
      this.process = spawn('python', [
        'main.py',
        '--model', this.modelPath,
        '--interactive'
      ], {
        cwd: path.join(process.cwd(), '../codellama')
      });
      
      this.process.stdout.on('data', (data: Buffer) => {
        console.log('LLM Output:', data.toString());
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize LLM:', error);
    }
  }

  async getSuggestion(code: string): Promise<string> {
    if (!this.initialized) {
      throw new Error('LLM not initialized');
    }

    return new Promise((resolve, reject) => {
      this.process.stdin.write(code + '\n');
      
      const timeout = setTimeout(() => {
        reject(new Error('LLM request timed out'));
      }, 10000);

      this.process.stdout.once('data', (data: Buffer) => {
        clearTimeout(timeout);
        resolve(data.toString().trim());
      });
    });
  }
}