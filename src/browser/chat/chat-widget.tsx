import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser';
import { injectable } from '@theia/core/shared/inversify';
import './chat.css';

@injectable()
export class ChatWidget extends ReactWidget {
    static readonly ID = 'chat-widget';
    static readonly LABEL = 'AI Chat';

    protected render(): React.ReactNode {
        return (
            <div className='chat-container'>
                <div className='chat-messages' id='chat-messages'>
                    {/* Messages will be rendered here */}
                </div>
                <div className='chat-input'>
                    <textarea 
                        placeholder='Ask CodeLlama...'
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            </div>
        );
    }

    private handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const target = event.target as HTMLTextAreaElement;
            this.sendMessage(target.value);
            target.value = '';
        }
    }

    private sendMessage = async (message: string) => {
        // WebSocket communication will be implemented here
    }
}