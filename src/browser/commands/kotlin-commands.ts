import { Command, CommandContribution, CommandRegistry } from '@theia/core/lib/common/command';
import { inject, injectable } from '@theia/core/shared/inversify';
import { KotlinService } from '../kotlin/kotlin-service';

export namespace KotlinCommands {
    export const COMPILE: Command = {
        id: 'kotlin.compile',
        label: 'Compile Kotlin File'
    };
    
    export const RUN: Command = {
        id: 'kotlin.run',
        label: 'Run Kotlin File'
    };
}

@injectable()
export class KotlinCommandContribution implements CommandContribution {
    @inject(KotlinService)
    protected readonly kotlinService: KotlinService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(KotlinCommands.COMPILE, {
            execute: () => this.kotlinService.compile()
        });

        registry.registerCommand(KotlinCommands.RUN, {
            execute: () => this.kotlinService.run()
        });
    }
}