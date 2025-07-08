import crypto from "crypto";
import { IUser } from "../models/User";

const BOT_TOKEN = process.env.BOT_TOKEN!;

export function checkTelegramAuth(data: IUser) {
  const { hash, ...rest } = data;

  const secret = crypto.createHash("sha256").update(BOT_TOKEN).digest();
  const checkString = Object.keys(rest)
    .sort()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    .map(key => `${key}=${rest[key]}`)
    .join("\n");

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(checkString)
    .digest("hex");

  return hmac === hash;
}
