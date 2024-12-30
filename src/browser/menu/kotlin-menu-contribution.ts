import { MenuContribution, MenuModelRegistry } from '@theia/core';
import { injectable } from '@theia/core/shared/inversify';
import { CommonMenus } from '@theia/core/lib/browser/common-frontend-contribution';
import { KotlinCommands } from '../commands/kotlin-commands';

@injectable()
export class KotlinMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerSubmenu(CommonMenus.FILE, 'Kotlin');

        menus.registerMenuAction(CommonMenus.FILE_RUN, {
            commandId: KotlinCommands.COMPILE.id,
            label: 'Compile Kotlin File'
        });

        menus.registerMenuAction(CommonMenus.FILE_RUN, {
            commandId: KotlinCommands.RUN.id,
            label: 'Run Kotlin File'
        });
    }
}