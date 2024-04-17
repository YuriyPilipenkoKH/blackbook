"use server"

import { currentUser } from "@clerk/nextjs";

export async function retrieveUserId() {
    const user = await currentUser()
    if(!user) {
        throw new Error('User not found')  
      }
    if(user) {
        console.log('UserID', user?.id);
       return user?.id 
      }
}