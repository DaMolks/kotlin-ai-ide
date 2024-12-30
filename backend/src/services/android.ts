import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export class AndroidService {
    private androidSdk: string;

    constructor() {
        this.androidSdk = process.env.ANDROID_SDK_ROOT || '';
    }

    async buildProject(projectPath: string): Promise<{ success: boolean; output: string }> {
        try {
            const { stdout, stderr } = await execAsync('./gradlew assembleDebug', {
                cwd: projectPath
            });

            return {
                success: !stderr,
                output: stdout || stderr
            };
        } catch (error: any) {
            return {
                success: false,
                output: error.message
            };
        }
    }

    async startEmulator(): Promise<boolean> {
        try {
            const emulatorPath = path.join(this.androidSdk, 'emulator/emulator');
            await execAsync(`${emulatorPath} -avd Pixel_API_30`);
            return true;
        } catch (error) {
            console.error('Failed to start emulator:', error);
            return false;
        }
    }

    async installApk(apkPath: string): Promise<boolean> {
        try {
            const adbPath = path.join(this.androidSdk, 'platform-tools/adb');
            await execAsync(`${adbPath} install ${apkPath}`);
            return true;
        } catch (error) {
            console.error('Failed to install APK:', error);
            return false;
        }
    }
}