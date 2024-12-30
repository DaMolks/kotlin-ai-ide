import { BaseLanguageClientContribution, LanguageClientFactory } from '@theia/languages/lib/browser';
import { inject, injectable } from '@theia/core/shared/inversify';
import { KOTLIN_LANGUAGE_ID, KOTLIN_LANGUAGE_NAME } from '../common';

@injectable()
export class KotlinClientContribution extends BaseLanguageClientContribution {
    readonly id = KOTLIN_LANGUAGE_ID;
    readonly name = KOTLIN_LANGUAGE_NAME;

    constructor(
        @inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory
    ) {
        super(languageClientFactory);
    }

    protected get globPatterns() {
        return [
            '**/*.kt'
        ];
    }
}