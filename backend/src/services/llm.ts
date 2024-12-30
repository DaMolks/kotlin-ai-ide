import { spawn } from 'child_process';

export class LLMService {
  private modelProcess: any;

  constructor() {
    this.setupModel();
  }

  private setupModel() {
    // Configuration pour CodeLlama
    this.modelProcess = spawn('codellama', ['--interactive']);

    this.modelProcess.stdout.on('data', (data: Buffer) => {
      console.log('Model output:', data.toString());
    });

    this.modelProcess.stderr.on('data', (data: Buffer) => {
      console.error('Model error:', data.toString());
    });
  }

  async processPrompt(prompt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.modelProcess.stdin.write(prompt + '\n');
      
      let output = '';
      const timeoutId = setTimeout(() => {
        reject(new Error('Model response timeout'));
      }, 30000);

      const dataHandler = (data: Buffer) => {
        output += data.toString();
        if (output.includes('[END]')) {  // Marqueur de fin de réponse
          clearTimeout(timeoutId);
          this.modelProcess.stdout.removeListener('data', dataHandler);
          resolve(output.replace('[END]', '').trim());
        }
      };

      this.modelProcess.stdout.on('data', dataHandler);
    });
  }
}