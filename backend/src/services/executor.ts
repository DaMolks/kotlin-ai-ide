import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export class KotlinExecutor {
  async execute(filePath: string): Promise<{ success: boolean; output: string }> {
    try {
      const className = path.basename(filePath, '.kt');
      const jarPath = path.join(path.dirname(filePath), `${className}.jar`);
      
      await execAsync(`kotlinc ${filePath} -include-runtime -d ${jarPath}`);
      const { stdout } = await execAsync(`java -jar ${jarPath}`);
      
      return { success: true, output: stdout };
    } catch (error: any) {
      return { success: false, output: error.message };
    }
  }
}