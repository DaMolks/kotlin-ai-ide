import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class AIContextManager {
    private context: Map<string, any> = new Map();
    private readonly maxHistorySize = 10;
    private conversationHistory: Array<{role: string, content: string}> = [];

    updateContext(key: string, value: any): void {
        this.context.set(key, value);
    }

    addToHistory(role: 'user' | 'assistant', content: string): void {
        this.conversationHistory.push({ role, content });
        if (this.conversationHistory.length > this.maxHistorySize) {
            this.conversationHistory.shift();
        }
    }

    getContext(): string {
        const contextData = {
            history: this.conversationHistory,
            currentFile: this.context.get('currentFile'),
            projectStructure: this.context.get('projectStructure'),
            recentErrors: this.context.get('recentErrors')
        };
        return JSON.stringify(contextData);
    }

    reset(): void {
        this.context.clear();
        this.conversationHistory = [];
    }
}