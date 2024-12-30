import { injectable } from '@theia/core/shared/inversify';
import { LanguageServerConfig } from '@theia/languages/lib/browser/language-client-contribution';

@injectable()
export class KotlinLanguageConfig implements LanguageServerConfig {
    readonly documentSelector = ['kotlin'];
    readonly synchronize = {
        configurationSection: 'kotlin',
        fileEvents: [
            '**/*.kt',
            '**/pom.xml',
            '**/build.gradle',
            '**/settings.gradle'
        ]
    };

    readonly initializationOptions = {
        snippetsEnabled: true,
        completionSettings: {
            completionTriggers: [':', '.', '@'],
            importOnCompletion: true
        },
        diagnosticsSettings: {
            includeRuntimeErrors: true,
            enableExperimentalFeatures: false
        }
    };
}