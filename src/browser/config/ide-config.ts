export interface IDEConfig {
    theme: 'dark' | 'light';
    fontSize: number;
    autosave: boolean;
    ai: {
        suggestionDelay: number;
        maxHistorySize: number;
        cacheTimeout: number;
    };
    android: {
        sdkPath: string;
        buildToolsVersion: string;
        defaultMinSdk: number;
    };
}

export const DEFAULT_CONFIG: IDEConfig = {
    theme: 'dark',
    fontSize: 14,
    autosave: true,
    ai: {
        suggestionDelay: 1000,
        maxHistorySize: 10,
        cacheTimeout: 1800000
    },
    android: {
        sdkPath: process.env.ANDROID_SDK_ROOT || '',
        buildToolsVersion: '30.0.3',
        defaultMinSdk: 21
    }
};