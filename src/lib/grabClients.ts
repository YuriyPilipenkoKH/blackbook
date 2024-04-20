import Client from "@/models/Client";
import { connectMongoDB } from "./mongoDB";
import ClientTypes from "@/models/ClientTypes";

export const grabClients = async () => {
    try {
        await connectMongoDB();
        const clientList = await Client.find().select('-_id')

               // Convert _id to string for each document
            //    const modifiedClientList:any[] = clientList.map(client => {
            //     const modifiedClient = client.toObject();
            //     modifiedClient._id = modifiedClient._id.toString(); // Convert ObjectId to string
            //     return modifiedClient;
            // });
    
       // Convert each document to a plain JavaScript object
       const plainList: ClientTypes[] = clientList.map(client => client.toObject());

       return plainList;
    } 
    catch (error) {
        console.error('Error fetching clients:', error);
        return { error: 'Failed to fetch clients' };
    }
}