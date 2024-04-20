import { connectMongoDB } from "@/lib/mongoDB";
import Client from "@/models/Client";

import { NextRequest, NextResponse } from "next/server";


export async function GET(
    req:NextRequest, 
    {params}: {params: {clientId: string}}) {

    try {
        await connectMongoDB()
        const {clientId} = params
        console.log(clientId)

        const usersList = await Client.find()
        const filteredUsersList = usersList.filter(
            (user) => user.clientId !== clientId
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