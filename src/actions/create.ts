'use server'

import { connectMongoDB } from "@/lib/mongoDB"
import Client from "@/models/Client"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"
import { NextRequest, NextResponse } from "next/server";


export const createClient = async(formData: FormData) => {

    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phone = formData.get('phone')

    try {
        await connectMongoDB()
        const newClient= new Client({
            firstName,
            lastName,
            email,
            phone
        });
        await newClient.save();

        return {
            message: `Client created successfully`,
            success: true,
            newClient: newClient.toObject() // Convert to plain object
        };

    } 
    catch (error) {
        return {
            message: "Failed to create new Client",
            success: false
        };
    }
    revalidatePath("/")
    redirect("/")
}

