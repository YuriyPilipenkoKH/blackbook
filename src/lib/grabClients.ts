import Client from "@/models/Client";
import { connectMongoDB } from "./mongoDB";
import ClientTypes from "@/models/ClientTypes";

export const grabClients = async (page:number) => {
    try {
        await connectMongoDB();
        const perPage = 4
        const pageNumber  = page || 1
        const clientsCount = 
            await Client.find({}).countDocuments()
        const clientList = 
            await Client.find({}).select('-_id').limit(perPage).skip((pageNumber - 1) * perPage)
        const totalPages = Math.ceil(clientsCount / perPage)
        
        // Convert each document to a plain JavaScript object
        const plainList: ClientTypes[] = clientList.map(client => client.toObject());
        
        return {plainList, totalPages, clientsCount};
    } 
    catch (error) {
        console.error('Error fetching clients:', error);
        return { error: 'Failed to fetch clients' };
    }
}


// Convert _id to string for each document
//    const modifiedClientList:any[] = clientList.map(client => {
//     const modifiedClient = client.toObject();
//     modifiedClient._id = modifiedClient._id.toString(); // Convert ObjectId to string
//     return modifiedClient;
// });