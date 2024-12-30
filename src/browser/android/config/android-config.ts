export interface AndroidConfig {
    sdkPath: string;
    buildToolsVersion: string;
    compileSdkVersion: number;
    minSdkVersion: number;
    targetSdkVersion: number;
}

export const DEFAULT_ANDROID_CONFIG: AndroidConfig = {
    sdkPath: process.env.ANDROID_SDK_ROOT || '',
    buildToolsVersion: '30.0.3',
    compileSdkVersion: 30,
    minSdkVersion: 21,
    targetSdkVersion: 30
};