import { injectable } from '@theia/core/shared/inversify';
import { EditorManager } from '@theia/editor/lib/browser';
import { MessageService } from '@theia/core';

@injectable()
export class KotlinService {
    constructor(
        @inject(EditorManager) private readonly editorManager: EditorManager,
        @inject(MessageService) private readonly messageService: MessageService
    ) {}

    async compile(): Promise<void> {
        const editor = this.editorManager.currentEditor;
        if (!editor) {
            this.messageService.error('No active editor');
            return;
        }

        const text = editor.editor.document.getText();
        try {
            const response = await fetch('http://localhost:3000/compile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: text })
            });

            const result = await response.json();
            if (result.success) {
                this.messageService.info('Compilation successful');
            } else {
                this.messageService.error(`Compilation failed: ${result.output}`);
            }
        } catch (error) {
            this.messageService.error(`Error compiling: ${error}`);
        }
    }

    async run(): Promise<void> {
        // Implementation similaire pour l'exécution
    }
}