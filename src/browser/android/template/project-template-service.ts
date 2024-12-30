import { injectable } from '@theia/core/shared/inversify';
import { FileService } from '@theia/filesystem/lib/browser/file-service';
import { AndroidConfig } from '../config/android-config';

@injectable()
export class ProjectTemplateService {
    constructor(
        @inject(FileService) private readonly fileService: FileService
    ) {}

    async createProject(projectName: string, packageName: string, config: AndroidConfig): Promise<void> {
        const templateVars = {
            projectName,
            packageName,
            applicationId: packageName,
            ...config
        };

        const templates = [
            'build.gradle',
            'MainActivity.kt',
            'AndroidManifest.xml',
            'activity_main.xml'
        ];

        for (const template of templates) {
            const content = await this.loadAndProcessTemplate(template, templateVars);
            await this.createProjectFile(projectName, template, content);
        }
    }

    private async loadAndProcessTemplate(templateName: string, vars: any): Promise<string> {
        const templatePath = `/templates/android/basic/${templateName}`;
        const content = await this.fileService.read(templatePath);
        return this.processTemplate(content.value, vars);
    }

    private processTemplate(content: string, vars: any): string {
        return content.replace(/\{(\w+)\}/g, (match, key) => vars[key] || match);
    }

    private async createProjectFile(projectName: string, fileName: string, content: string): Promise<void> {
        const filePath = this.getProjectFilePath(projectName, fileName);
        await this.fileService.write(filePath, content);
    }

    private getProjectFilePath(projectName: string, fileName: string): string {
        // Logic pour déterminer le chemin du fichier dans la structure du projet
        return `/${projectName}/${fileName}`;
    }
}