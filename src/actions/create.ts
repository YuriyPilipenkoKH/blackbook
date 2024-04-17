'use server'

import { connectMongoDB } from "@/lib/mongoDB"
import Client from "@/models/Client"
import ClientTypes from "@/models/ClientTypes"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"


export const createClient = async(formData: FormData) => {

    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phone = formData.get('phone')

    try {
        await connectMongoDB()
        const newContact = new Client({
            firstName,
            lastName,
            email,
            phone
        });
        await newContact.save();
    } 
    catch (error) {
        throw new Error ("Failed To Create Contact " + error)
    }
    revalidatePath("/")
    redirect("/")
}