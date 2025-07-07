import crypto from 'crypto';

const BOT_TOKEN = process.env.BOT_TOKEN!;

export function checkTelegramAuth(data: any) {
    const { hash, ...rest } = data;

    const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
    const checkString = Object.keys(rest)
        .sort()
        .map(key => `${key}=${rest[key]}`)
        .join('\n');

    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

    return hmac === hash;
}