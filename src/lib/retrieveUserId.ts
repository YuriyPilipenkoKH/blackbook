"use server"

import { currentUser } from "@clerk/nextjs";

export async function retrieveUserId() {
  try {
    
    const user = await currentUser()
    if(!user) {
        console.log('User not found')  
      }
    if(user) {
        console.log('UserID', user?.id);
       return user?.id 
      }
  }

   catch (error) {
    console.log('something went wrong ' + error) 
  }
}