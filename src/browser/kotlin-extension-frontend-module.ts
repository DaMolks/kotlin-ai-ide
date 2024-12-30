import { ContainerModule } from '@theia/core/shared/inversify';
import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { KotlinClientContribution } from './kotlin-client-contribution';

export default new ContainerModule(bind => {
    bind(KotlinClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toService(KotlinClientContribution);
});