import { MenuContribution, MenuModelRegistry, MAIN_MENU_BAR } from '@theia/core';
import { injectable } from '@theia/core/shared/inversify';
import { AndroidCommands } from '../commands/android-commands';

@injectable()
export class AndroidMenuContribution implements MenuContribution {
    private readonly ANDROID_MENU = [...MAIN_MENU_BAR, '9_androidmenu'];
    private readonly ANDROID_SUBMENU = [...this.ANDROID_MENU, '1_androidsubmenu'];

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerSubmenu(this.ANDROID_MENU, 'Android');

        menus.registerMenuAction(this.ANDROID_SUBMENU, {
            commandId: AndroidCommands.BUILD.id,
            order: '1'
        });

        menus.registerMenuAction(this.ANDROID_SUBMENU, {
            commandId: AndroidCommands.RUN_EMULATOR.id,
            order: '2'
        });

        menus.registerMenuAction(this.ANDROID_SUBMENU, {
            commandId: AndroidCommands.INSTALL_APK.id,
            order: '3'
        });
    }
}