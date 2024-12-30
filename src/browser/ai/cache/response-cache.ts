interface CacheEntry {
    response: string;
    timestamp: number;
    context?: string;
}

@injectable()
export class AIResponseCache {
    private cache: Map<string, CacheEntry> = new Map();
    private readonly cacheDuration = 30 * 60 * 1000; // 30 minutes

    set(key: string, response: string, context?: string): void {
        this.cache.set(key, {
            response,
            timestamp: Date.now(),
            context
        });
    }

    get(key: string, context?: string): string | null {
        const entry = this.cache.get(key);
        if (!entry) return null;

        if (this.isExpired(entry)) {
            this.cache.delete(key);
            return null;
        }

        if (context && entry.context !== context) return null;

        return entry.response;
    }

    private isExpired(entry: CacheEntry): boolean {
        return Date.now() - entry.timestamp > this.cacheDuration;
    }

    clear(): void {
        this.cache.clear();
    }
}