import { spawn } from 'child_process';
import path from 'path';

interface LLMStatus {
  initialized: boolean;
  error: string;
}

export class LLMService {
  private process: any;
  private initialized: boolean = false;
  private lastError: string = '';

  constructor() {
    this.initializeLLM();
  }

  private async initializeLLM() {
    try {
      console.log('Starting CodeLlama...');
      this.process = spawn('python', 
        ['llama_cpp/example.py', '--model', 'models/codellama-7b.Q4_K_M.gguf', '--interactive'], 
        { cwd: path.join(process.cwd(), '../codellama') }
      );

      this.process.stdout.on('data', (data: Buffer) => {
        console.log('LLM Output:', data.toString());
      });

      this.process.stderr.on('data', (data: Buffer) => {
        this.lastError = data.toString();
        console.error('LLM Error:', data.toString());
      });

      this.initialized = true;
      console.log('CodeLlama initialized');
    } catch (error) {
      if (error instanceof Error) {
        this.lastError = error.message;
      } else {
        this.lastError = String(error);
      }
      console.error('Failed to initialize LLM:', this.lastError);
    }
  }

  getStatus(): LLMStatus {
    return {
      initialized: this.initialized,
      error: this.lastError,
    };
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