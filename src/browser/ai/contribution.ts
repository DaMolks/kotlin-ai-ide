import { injectable, inject } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution, FrontendApplication } from '@theia/core/lib/browser';
import { AISuggestionsWidget } from './widgets/ai-suggestions-widget';
import { LLMService } from './llm-service';

@injectable()
export class AIContribution implements FrontendApplicationContribution {
    @inject(AISuggestionsWidget)
    protected readonly suggestionsWidget: AISuggestionsWidget;

    @inject(LLMService)
    protected readonly llmService: LLMService;

    initialize() {
        this.llmService.connect();
    }

    onStart(app: FrontendApplication) {
        app.shell.addWidget(this.suggestionsWidget, { area: 'right', rank: 500 });
    }
}