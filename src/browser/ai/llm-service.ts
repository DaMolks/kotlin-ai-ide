import { injectable } from '@theia/core/shared/inversify';

interface AIResponse {
    code?: string;
    explanation?: string;
    suggestions?: string[];
}

@injectable()
export class LLMService {
    private ws: WebSocket | null = null;

    connect(): void {
        this.ws = new WebSocket('ws://localhost:3000/ai');
        this.setupWebSocket();
    }

    private setupWebSocket(): void {
        if (!this.ws) return;

        this.ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            window.dispatchEvent(new CustomEvent('ai-response', { detail: response }));
        };
    }

    async sendPrompt(prompt: string, context?: string): Promise<AIResponse> {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error('AI service not connected');
        }

        this.ws.send(JSON.stringify({ prompt, context }));
        return new Promise((resolve) => {
            const handler = (event: Event) => {
                const response = (event as CustomEvent).detail;
                window.removeEventListener('ai-response', handler);
                resolve(response);
            };
            window.addEventListener('ai-response', handler);
        });
    }

    async completeCode(code: string, cursor: number): Promise<string> {
        const response = await this.sendPrompt('complete_code', code);
        return response.code || '';
    }
}