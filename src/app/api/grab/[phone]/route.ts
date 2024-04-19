import { connectMongoDB } from "@/lib/mongoDB";
import Client from "@/models/Client";

import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req:NextRequest, 
    {params}: {params: {phone: string}}) {

    try {
        await connectMongoDB()
        const {phone} = params
        console.log(phone)

        const usersList = await Client.find()
        const filteredUsersList = usersList.filter(
            (user) => user.phone !== phone
        );

        return NextResponse.json({
            message: `Users found`,
            success: true,
            usersList: filteredUsersList,
        });
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Users not found"},
             {status: 500})
         }
}