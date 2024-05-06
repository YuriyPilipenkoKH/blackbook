"use server"

import Client from "@/models/Client";
import ClientTypes from "@/models/ClientTypes";
import { connectMongoDB } from "./mongoDB";

export const mapAndRemoveContactIds = async () => {
    try {
        await connectMongoDB();
        
        // Fetch all contacts from the database
        const allContacts = await Client.find({});
        
        // Map through each contact and remove the contactId key-value pair
        const updatedContacts = allContacts.map(contact => {
            const updatedContact: ClientTypes = contact.toObject();
            // delete updatedContact.contactId;

            return updatedContact;
        });
        
        // Update each contact in the database with the updated key-value pairs
        for (const updatedContact of updatedContacts) {
            await Client.findOneAndUpdate(
                // { _id: updatedContact._id },
                // updatedContact
            );
        }
        
        return { message: 'All contacts mapped and updated with removed contactIds' };
    } catch (error) {
        console.error('Error mapping and removing contactIds:', error);
        return { error: 'Failed to map and remove contactIds' };
    }
}
