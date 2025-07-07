import dbConnect from "./db";
import User from "../models/User";
import { revalidatePath } from 'next/cache';

export async function createUser() {
    'use server'

    await dbConnect();

    try {
        const newUser = await User.create({ "id": 388906921,
            "first_name": "Vitalii",
            "last_name": "Telychko",
            "username": "vitalii_telychko",
            "photo_url": "https://t.me/i/userpic/320/z4xccDXY19G8ATVczACbA6n4rSX7rHUYP7zchRCwR_8.jpg",
            "auth_date": 1751896095,
            "hash": "62f4b0d9f179b0e92f032bf613225b9553d49b72a155542985625aa5025e96bd" });
        revalidatePath('/'); // Revalidate the path where posts are displayed
        return { success: true, data: JSON.parse(JSON.stringify(newUser)) };
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return { success: false, error: error.message };
    }

    // const data = {
    //         "id": 388906921,
    //         "first_name": "Vitalii",
    //         "last_name": "Telychko",
    //         "username": "vitalii_telychko",
    //         "photo_url": "https://t.me/i/userpic/320/z4xccDXY19G8ATVczACbA6n4rSX7rHUYP7zchRCwR_8.jpg",
    //         "auth_date": 1751896095,
    //         "hash": "62f4b0d9f179b0e92f032bf613225b9553d49b72a155542985625aa5025e96bd"
    //     }

    // Update data
    // Revalidate cache
}