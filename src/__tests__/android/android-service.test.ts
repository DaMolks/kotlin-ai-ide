import { AndroidService } from '../../browser/android/android-service';
import { MessageService } from '@theia/core';

describe('AndroidService', () => {
    let service: AndroidService;
    let messageService: MessageService;

    beforeEach(() => {
        messageService = {
            info: jest.fn(),
            error: jest.fn()
        } as any;
        service = new AndroidService(messageService);
    });

    test('should build APK successfully', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true })
            })
        );

        const result = await service.buildApk('test/path');
        expect(result).toBeTruthy();
    });

    test('should handle build failure', async () => {
        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.reject(new Error('Build failed'))
        );

        const result = await service.buildApk('test/path');
        expect(result).toBeFalsy();
        expect(messageService.error).toHaveBeenCalled();
    });
});