'use server'

import { connectMongoDB } from "@/lib/mongoDB"
import Client from "@/models/Client"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"
import { customAlphabet } from 'nanoid';
import { NextRequest } from "next/server"
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10);


export const createClient = async(formData: FormData, params :string) => {


    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phone = formData.get('phone')

    try {
        await connectMongoDB()
        const newClient= new Client({
            clientId: nanoid(),
            firstName,
            lastName,
            email,
            phone
        });
        await newClient.save();

        return {
            message: `Client created successfully`,
            success: true,
            newClient: newClient.toObject(), // Convert to plain object
            lastName: lastName
        };
    } 
    catch (error) {
        return {
            message: "Failed to create new Client",
            success: false,
            lastName: lastName
        };
    }
    finally {
        revalidatePath(`/?${params}`);
        redirect(`/?${params}`);
    }
}

