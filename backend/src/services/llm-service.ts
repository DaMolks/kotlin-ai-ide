import { spawn } from 'child_process';

export class LLMService {
  private process: any;
  private initialized: boolean = false;

  constructor() {
    this.initializeLLM();
  }

  private async initializeLLM() {
    try {
      this.process = spawn('codellama/codellama', ['--interactive']);
      
      this.process.stdout.on('data', (data: Buffer) => {
        console.log('LLM Output:', data.toString());
      });

      this.process.stderr.on('data', (data: Buffer) => {
        console.error('LLM Error:', data.toString());
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize LLM:', error);
    }
  }

  async getSuggestion(code: string, type: string): Promise<string> {
    if (!this.initialized) {
      throw new Error('LLM not initialized');
    }

    const prompts = {
      completion: `Complete this Kotlin code:\n${code}\n`,
      fix: `Fix any issues in this Kotlin code:\n${code}\n`,
      explanation: `Explain this Kotlin code:\n${code}\n`
    };

    return new Promise((resolve, reject) => {
      this.process.stdin.write(prompts[type as keyof typeof prompts]);
      
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