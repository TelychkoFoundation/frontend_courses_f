"use client"

import { useEffect } from 'react';

export default function Auth() {
    useEffect(() => {
        // Створюємо глобальну функцію, яку Telegram викличе
        (window as any).onTelegramAuth = async (user: any) => {
            console.log("✅ Telegram user data:", user)

            // Редірект
            window.location.href = '/courses';

            // // Відправляємо user обʼєкт на сервер
            // const res = await fetch('/api/auth/telegram', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(user)
            // })
            //
            // if (res.ok) {
            //     window.location.href = '/dashboard'
            // } else {
            //     alert('❌ Помилка авторизації. Спробуйте ще раз.')
            // }
        }

        const scriptId = "telegram-login-script"
        if (document.getElementById(scriptId)) return // вже є

        const script = document.createElement('script')
        script.src = 'https://telegram.org/js/telegram-widget.js?7'
        script.setAttribute('data-telegram-login', 'Telychko Frontend Courses') // 👈 заміни на свого бота
        script.setAttribute('data-size', 'large')
        script.setAttribute('data-userpic', 'true')
        script.setAttribute('data-request-access', 'write')
        script.setAttribute('data-lang', 'uk')
        script.setAttribute('data-onauth', 'onTelegramAuth(user)') // 👈 виклик глобальної функції
        script.id = scriptId
        script.async = true

        document.getElementById('telegram-login-btn')?.appendChild(script)

        // Cleanup
        return () => {
            document.getElementById(scriptId)?.remove()
        }
    }, [])

    return (
        <div id="telegram-login-btn" />
    );
}