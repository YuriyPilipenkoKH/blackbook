'use server'

import { connectMongoDB } from "@/lib/mongoDB"
import Client from "@/models/Client"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"


export const removeClient = async(formData: FormData, params :string) => {

    const clientId= formData.get('clientId')
    const lastName = formData.get('lastName')

    try {
        await connectMongoDB()
       const clientToRemove = await Client.findOneAndDelete({ clientId });

        return {
            message: `${clientToRemove?.lastName} removed successfully`,
            success: true,
            lastName: clientToRemove.lastName
        };

    } 
    catch (error) {
        return {
            message: `Failed to remove ${lastName}`,
            success: false
        };
    }
    finally {
        revalidatePath(`/?${params}`);
        redirect(`/?${params}`);
    }
}

