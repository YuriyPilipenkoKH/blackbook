import { connectMongoDB } from "@/lib/mongoDB";
import Client from "@/models/Client";

import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,  res:NextResponse) {

    try {
        await connectMongoDB()
        const usersList = await Client.find()

        return NextResponse.json({
            message: `Users found`,
            success: true,
            usersList,
        });
    } 
    catch (error) {
        return NextResponse.json(
            { message: "Users not found"},
             {status: 500})
         }
}