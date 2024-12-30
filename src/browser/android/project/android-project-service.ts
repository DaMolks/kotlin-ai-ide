import { injectable, inject } from '@theia/core/shared/inversify';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { AndroidConfig } from '../config/android-config';
import { ProjectTemplateService } from '../template/project-template-service';

@injectable()
export class AndroidProjectService {
    @inject(FileService)
    protected readonly fileService: FileService;

    @inject(ProjectTemplateService)
    protected readonly templateService: ProjectTemplateService;

    async createNewProject(projectName: string, packageName: string, config: AndroidConfig): Promise<void> {
        await this.templateService.createProject(projectName, packageName, config);
        await this.initializeGradleWrapper(projectName);
        await this.setupAndroidManifest(projectName, packageName);
    }

    private async initializeGradleWrapper(projectPath: string): Promise<void> {
        // TODO: Implémenter l'initialisation Gradle
    }

    private async setupAndroidManifest(projectPath: string, packageName: string): Promise<void> {
        // TODO: Implémenter la configuration du manifest
    }

    async buildProject(projectPath: string): Promise<boolean> {
        try {
            const response = await fetch('http://localhost:3000/android/build', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectPath })
            });
            return response.ok;
        } catch (error) {
            console.error('Build failed:', error);
            return false;
        }
    }

    async runProject(projectPath: string): Promise<void> {
        // TODO: Implémenter le lancement sur émulateur
    }
}