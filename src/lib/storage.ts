// In-memory storage for verification codes (in production, use Redis or database)
export const verificationCodes = new Map<string, { code: string; timestamp: number }>();