import { spawn } from 'child_process';

export class AIService {
  private process: any;

  constructor() {
    this.initializeModel();
  }

  private initializeModel() {
    this.process = spawn('codellama', ['--interactive']);
    
    this.process.stdout.on('data', (data: Buffer) => {
      console.log('Model output:', data.toString());
    });
  }

  async getCompletion(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.process.stdin.write(prompt + '\n');
      this.process.stdout.once('data', (data: Buffer) => {
        resolve(data.toString());
      });
    });
  }
}