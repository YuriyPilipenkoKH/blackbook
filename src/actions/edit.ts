'use server'

import { connectMongoDB } from "@/lib/mongoDB"
import Client from "@/models/Client"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"


export const updateClient = async(formData: FormData) => {

    const clientId = formData.get('clientId')
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const updatedFields = {
        clientId,
        firstName, 
        lastName, 
        email, 
        phone
    }

    try {
        await connectMongoDB()
        let client =  await Client.findOne({ clientId });
  
        if (!client) {
            return {
                message: `Client not found`,
                success: false,
                lastName: lastName
            };
        }

        Object.assign(client, updatedFields);
       const updatedClient = await client.save();

        return {
            message: `Client updated successfully`,
            success: true,
            lastName: lastName,
            updatedClient
        };
    } 
    catch (error) {
        return {
            message: "Failed to update new Client",
            success: false,
            lastName: lastName
        };
    }
    finally {
        revalidatePath("/");
        redirect("/");
    }
}

