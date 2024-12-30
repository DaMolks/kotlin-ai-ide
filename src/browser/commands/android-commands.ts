import { Command, CommandContribution, CommandRegistry } from '@theia/core';
import { inject, injectable } from '@theia/core/shared/inversify';
import { AndroidService } from '../android/android-service';

export namespace AndroidCommands {
    export const BUILD: Command = {
        id: 'android.build',
        label: 'Build Android APK'
    };
    
    export const RUN_EMULATOR: Command = {
        id: 'android.emulator',
        label: 'Start Android Emulator'
    };

    export const INSTALL_APK: Command = {
        id: 'android.install',
        label: 'Install APK to Emulator'
    };
}

@injectable()
export class AndroidCommandContribution implements CommandContribution {
    @inject(AndroidService)
    protected readonly androidService: AndroidService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(AndroidCommands.BUILD, {
            execute: () => this.androidService.buildApk('.')
        });

        registry.registerCommand(AndroidCommands.RUN_EMULATOR, {
            execute: () => this.androidService.runEmulator()
        });

        registry.registerCommand(AndroidCommands.INSTALL_APK, {
            execute: async () => {
                // TODO: Implémenter la sélection d'APK
            }
        });
    }
}