import { injectable } from '@theia/core/shared/inversify';

@injectable()
export class ChatService {
    private socket: WebSocket | null = null;

    connect(): void {
        this.socket = new WebSocket('ws://localhost:3000');
        
        this.socket.onopen = () => {
            console.log('Connected to chat server');
        };

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.handleMessage(message);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    private handleMessage(message: any): void {
        const event = new CustomEvent('chat-message', { detail: message });
        window.dispatchEvent(event);
    }

    sendMessage(message: string): void {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ type: 'prompt', content: message }));
        }
    }
}