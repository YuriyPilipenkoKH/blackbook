import Client from "@/models/ClientTypes";


interface UserData {
    phone: string;
}

export const phoneAvailable = async (fieldValue: string): Promise<string | undefined> => {

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}api/grab?phone=${fieldValue}`);
        const data  = await response.json();
        //  console.log('data', data)
 
        const result = data?.usersList.filter((user: Client) => user?.phone === fieldValue)
        return result?.length === 0 ? undefined : 'Phone number already exists';

    } catch (error) {
        console.error('Error checking phone number availability:', error);
        // throw new Error('Failed to check email availability');
    }
};