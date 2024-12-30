import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class KotlinCompiler {
  async compile(code: string, filePath: string): Promise<{ success: boolean; output: string }> {
    try {
      await execAsync(`kotlinc ${filePath}`);
      return { success: true, output: 'Compilation successful' };
    } catch (error: any) {
      return { success: false, output: error.message };
    }
  }
}