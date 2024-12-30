import { ContainerModule } from '@theia/core/shared/inversify';
import { LLMService } from './ai/llm-service';
import { AIContextManager } from './ai/context/context-manager';
import { AIResponseCache } from './ai/cache/response-cache';
import { AISuggestionsWidget } from './ai/widgets/ai-suggestions-widget';
import { EditorObserver } from './ai/editor-observer';
import { AndroidService } from './android/android-service';
import { ProjectTemplateService } from './android/template/project-template-service';
import { AndroidProjectService } from './android/project/android-project-service';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { AIContribution } from './ai/contribution';

export default new ContainerModule(bind => {
    // AI Services
    bind(LLMService).toSelf().inSingletonScope();
    bind(AIContextManager).toSelf().inSingletonScope();
    bind(AIResponseCache).toSelf().inSingletonScope();
    bind(AISuggestionsWidget).toSelf().inSingletonScope();
    bind(EditorObserver).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).to(AIContribution).inSingletonScope();

    // Android Services
    bind(AndroidService).toSelf().inSingletonScope();
    bind(ProjectTemplateService).toSelf().inSingletonScope();
    bind(AndroidProjectService).toSelf().inSingletonScope();
});