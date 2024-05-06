"use server"

import Client from "@/models/Client";
import ClientTypes from "@/models/ClientTypes";
import { connectMongoDB } from "./mongoDB";
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10);



export const mapAndAddContactIds = async () => {
    try {
        // const db = await connectMongoDB();
        // const collection = db.collection('clients');
        
        // // Find all contacts
        // const allContacts = await collection.find({}).toArray();
        
        // // Map through each contact and add a unique contactId using nanoid
        // const updatedContacts = allContacts.map(contact => {
        //     const contactId = nanoid();
        //     return { ...contact, contactId };
        // });


        await connectMongoDB();
        
        // Fetch all contacts from the database
        const allContacts = await Client.find({});
        
        // Map through each contact and add a unique contactId using nanoid
        const updatedContacts = allContacts.map(contact => {
            const updatedContact: ClientTypes = contact.toObject();
            // updatedContact.contactId = nanoid();
            return updatedContact;
        });
        
        // Update each contact in the database with the new contactId
        for (const updatedContact of updatedContacts) {
            await Client.findOneAndUpdate(
                // { _id: updatedContact._id },
                // { contactId: updatedContact.contactId }
            );
        }
        
        return { message: 'All contacts mapped and updated with contactIds' };
    } catch (error) {
        console.error('Error mapping and adding contactIds:', error);
        return { error: 'Failed to map and add contactIds' };
    }
}
