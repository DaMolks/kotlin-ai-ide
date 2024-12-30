import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

export class KotlinService {
  private readonly tempDir = path.join(__dirname, '../temp');

  constructor() {
    this.ensureTempDir();
  }

  private async ensureTempDir() {
    try {
      await fs.mkdir(this.tempDir, { recursive: true });
    } catch (error) {
      console.error('Error creating temp directory:', error);
    }
  }

  async compile(sourceCode: string): Promise<{ success: boolean; output: string }> {
    const fileName = `temp_${Date.now()}.kt`;
    const filePath = path.join(this.tempDir, fileName);

    try {
      await fs.writeFile(filePath, sourceCode);

      return new Promise((resolve) => {
        exec(`kotlinc ${filePath}`, (error, stdout, stderr) => {
          if (error) {
            resolve({
              success: false,
              output: stderr
            });
          } else {
            resolve({
              success: true,
              output: stdout
            });
          }
        });
      });
    } finally {
      try {
        await fs.unlink(filePath);
      } catch (error) {
        console.error('Error cleaning up temp file:', error);
      }
    }
  }
}