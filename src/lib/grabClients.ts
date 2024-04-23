import Client from "@/models/Client";
import { connectMongoDB } from "./mongoDB";
import ClientTypes from "@/models/ClientTypes";

export const grabClients = async (page:number, query:string) => {
    try {
        await connectMongoDB();
        const perPage = 4
        const pageNumber  = page || 1

        // Construct the query to filter clients based on the search query
        const searchQuery: any = {};

        // If a search query is provided, specify the regex pattern for matching
        if (query) {
            const regexPattern = new RegExp(query, 'i');
            searchQuery.$or = [
                { firstName: regexPattern },
                { lastName: regexPattern },
                { email: regexPattern },
                { phone: regexPattern },
            ];
        }

        // const clientsCount = await Client.find({}).countDocuments()
        const clientsCount = await Client
                            .countDocuments(searchQuery);
        const clientList =  await Client
                            .find(searchQuery)
                            .select('-_id')
                            .limit(perPage)
                            .skip((pageNumber - 1) * perPage)
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