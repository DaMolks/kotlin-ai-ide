export class GradleUtils {
    static generateSettingsGradle(projectName: string): string {
        return `rootProject.name = "${projectName}"
include ':app'`;
    }

    static generateBuildGradle(config: any): string {
        return `buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:7.0.2'
        classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.5.31'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}`;
    }

    static generateLocalProperties(sdkPath: string): string {
        return `sdk.dir=${sdkPath.replace(/\\/g, '/')}`;
    }
}