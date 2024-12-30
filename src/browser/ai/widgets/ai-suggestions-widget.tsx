import * as React from 'react';
import { ReactWidget } from '@theia/core/lib/browser';
import { injectable, inject } from '@theia/core/shared/inversify';
import { LLMService } from '../llm-service';
import { AIContextManager } from '../context/context-manager';
import { AIResponseCache } from '../cache/response-cache';

@injectable()
export class AISuggestionsWidget extends ReactWidget {
    @inject(LLMService)
    protected readonly llmService: LLMService;

    @inject(AIContextManager)
    protected readonly contextManager: AIContextManager;

    @inject(AIResponseCache)
    protected readonly cache: AIResponseCache;

    protected suggestions: string[] = [];

    render(): React.ReactNode {
        return (
            <div className='ai-suggestions-container'>
                <div className='suggestions-header'>AI Suggestions</div>
                <div className='suggestions-list'>
                    {this.suggestions.map((suggestion, index) => (
                        <div key={index} className='suggestion-item'
                             onClick={() => this.applySuggestion(suggestion)}>
                            {suggestion}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    async updateSuggestions(code: string): Promise<void> {
        const context = this.contextManager.getContext();
        const cacheKey = `suggestions:${code}`;
        
        let suggestions = this.cache.get(cacheKey, context);
        if (!suggestions) {
            const response = await this.llmService.sendPrompt('suggest_improvements', code);
            suggestions = response.suggestions?.join('\n') || '';
            this.cache.set(cacheKey, suggestions, context);
        }

        this.suggestions = suggestions.split('\n');
        this.update();
    }

    private applySuggestion(suggestion: string): void {
        // Implémentation de l'application de la suggestion
    }
}