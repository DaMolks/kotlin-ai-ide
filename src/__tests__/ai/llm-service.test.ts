import { LLMService } from '../../browser/ai/llm-service';

describe('LLMService', () => {
    let service: LLMService;

    beforeEach(() => {
        service = new LLMService();
    });

    test('should connect to WebSocket', () => {
        service.connect();
        expect(service['ws']).toBeTruthy();
    });

    test('should send prompt and receive response', async () => {
        const mockResponse = { code: 'test code' };
        global.WebSocket = jest.fn().mockImplementation(() => ({
            send: jest.fn(),
            addEventListener: jest.fn()
        }));

        service.connect();
        const response = await service.sendPrompt('test');
        expect(response).toBeDefined();
    });
});