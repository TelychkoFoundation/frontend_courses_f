import { NextResponse } from "next/server";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, {
  polling: false,
});

const LOGIN_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/telegram`;

export async function POST(req: Request) {
  const { message } = await req.json();

  if (message && (message.text === "/start" || message.text === "/login")) {
    const chatId = message.chat.id;
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Увійти",
              login_url: {
                url: LOGIN_URL,
              },
            },
          ],
        ],
      },
    };

    await bot.sendMessage(
      chatId,
      "В цьому боті Ви отримаєте підтримку під час навчання. А поки треба авторизуватись",
      opts,
    );
  }

  return NextResponse.json({ status: "ok" });
}
