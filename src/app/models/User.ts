import mongoose, { Schema, Document } from 'mongoose';

// 1. Визначення інтерфейсу для типу документа
// Це допомагає з типобезпекою в TypeScript
export interface IUser extends Document {
    id: number; // Унікальний ID користувача Telegram
    first_name: string;
    last_name?: string; // Опціональне поле
    username?: string; // Опціональне поле
    photo_url?: string; // Опціональне поле
    auth_date: number; // Час авторизації у форматі Unix timestamp
    hash: string; // Хеш для верифікації даних
    createdAt?: Date; // Автоматично додається Mongoose
    updatedAt?: Date; // Автоматично додається Mongoose
}

// 2. Визначення схеми Mongoose
const UserSchema: Schema = new Schema({
    id: {
        type: Number,
        required: [true, 'Telegram ID is required'], // Поле є обов'язковим
        unique: true, // Кожен ID має бути унікальним
        index: true // Створюємо індекс для швидкого пошуку за ID
    },
    first_name: {
        type: String,
        required: [true, 'First name is required']
    },
    last_name: {
        type: String,
        required: false // Поле не є обов'язковим
    },
    username: {
        type: String,
        required: false, // Поле не є обов'язковим
        unique: true, // Username має бути унікальним (якщо існує)
        sparse: true // Дозволяє мати кілька документів з відсутнім (null) значенням username
    },
    photo_url: {
        type: String,
        required: false
    },
    auth_date: {
        type: Number,
        required: [true, 'Auth date is required']
    },
    hash: {
        type: String,
        required: [true, 'Hash is required']
    }
}, {
    timestamps: true // Автоматично додає поля `createdAt` та `updatedAt`
});

// 3. Створення та експорт моделі
// Перевіряємо, чи модель вже існує, щоб уникнути помилок при гарячій перезавантаженні (hot reloading) у Next.js
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
