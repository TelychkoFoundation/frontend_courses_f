// app/api/auth/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkTelegramAuth } from "../../lib/auth";

export async function POST(req: Request) {
    const data = await req.json()

    if (!checkTelegramAuth(data)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const cookieStore = cookies()
    cookieStore.set('auth_token', data.hash, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 тиждень
    })

    return NextResponse.json({ ok: true })
}
