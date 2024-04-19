import Client from "@/models/Client";
import { connectMongoDB } from "./mongoDB";

export const grabClients = async () => {
    try {
        await connectMongoDB();
        const clientList = await Client.find()

               // Convert _id to string for each document
               const modifiedClientList = clientList.map(client => {
                const modifiedClient = client.toObject();
                modifiedClient._id = modifiedClient._id.toString(); // Convert ObjectId to string
                return modifiedClient;
            });
    
            return modifiedClientList;
    } 
    catch (error) {
        console.error('Error fetching clients:', error);
        return { error: 'Failed to fetch clients' };
    }
}