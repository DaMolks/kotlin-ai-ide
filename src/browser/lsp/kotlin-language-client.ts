import { BaseLanguageClientContribution, LanguageClientFactory } from '@theia/languages/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';

@injectable()
export class KotlinLanguageClientContribution extends BaseLanguageClientContribution {
    readonly id = 'kotlin';
    readonly name = 'Kotlin';

    constructor(
        @inject(LanguageClientFactory)
        protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(languageClientFactory);
    }

    protected get documentSelector() {
        return ['kotlin'];
    }

    protected get globPatterns() {
        return ['**/*.kt'];
    }

    protected get serverCommand(): string {
        return 'kotlin-language-server';
    }

    protected get serverOptions() {
        return {
            run: {
                command: this.serverCommand,
                args: ['--stdio']
            },
            debug: {
                command: this.serverCommand,
                args: ['--stdio', '--debug']
            }
        };
    }
}