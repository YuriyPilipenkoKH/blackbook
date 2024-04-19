'use server'

import { connectMongoDB } from "@/lib/mongoDB"
import Client from "@/models/Client"
import { revalidatePath } from "next/cache"
import {redirect} from "next/navigation"


export const removeClient = async(formData: FormData) => {

    const phone = formData.get('phone')
    const lastName = formData.get('lastName')

    try {
        await connectMongoDB()
        await Client.findOneAndDelete({ phone: phone });

        return {
            message: `${lastName} removed successfully`,
            success: true,
            lastName: lastName
        };

    } 
    catch (error) {
        return {
            message: "Failed to remove",
            success: false
        };
    }
    finally {
        revalidatePath("/");
        redirect("/");
    }
}

