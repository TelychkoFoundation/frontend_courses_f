"use server"

import dbConnect from "./db";
import User, {IUser} from "../models/User";
import { revalidatePath } from 'next/cache';

export async function createUser(userData: IUser) {
    await dbConnect();

    try {
        const newUser = await User.create(userData);
        revalidatePath('/'); // Revalidate the path where posts are displayed
        return { success: true, data: JSON.parse(JSON.stringify(newUser)) };
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return { success: false, error: error.message };
    }
}