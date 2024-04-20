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
            };
        }

        Object.assign(client, updatedFields);
       const updatedClient = await client.save();

        return {
            message: `${updatedClient?.lastName} updated successfully`,
            success: true,
            lastName: updatedClient?.lastName,
            updatedClient
        };
    } 
    catch (error) {
        return {
            message: `Failed to update ${lastName}`,
            success: false,
            lastName: lastName
        };
    }
    finally {
        revalidatePath("/");
        redirect("/");
    }
}

