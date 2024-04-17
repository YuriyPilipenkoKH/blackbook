"use server"

import { currentUser } from "@clerk/nextjs";

export async function retrieveUserName() {
    const user = await currentUser()
    if(!user) {
        throw new Error('User not found')  
      }
    if(user) {
        console.log('UserName',user?.firstName);
       return user?.firstName
      }
}