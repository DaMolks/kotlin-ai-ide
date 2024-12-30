import { injectable, inject } from '@theia/core/shared/inversify';
import { MessageService } from '@theia/core';

@injectable()
export class AndroidService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService
    ) {}

    async buildApk(projectPath: string): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:3000/android/build', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectPath })
            });
            const result = await response.json();
            return result.success;
        } catch (error) {
            this.messageService.error(`Build failed: ${error}`);
            return false;
        }
    }

    async runEmulator(): Promise<void> {
        try {
            await fetch('http://localhost:3000/android/emulator', { method: 'POST' });
        } catch (error) {
            this.messageService.error(`Emulator failed: ${error}`);
        }
    }
}