import Client from "@/models/ClientTypes";


interface UserData {
    phone: string;
}

export const phoneAvailable = async (fieldValue: string, clientId: string): Promise<string | undefined> => {
    let BASE_URL = ''
    if( clientId) {
         BASE_URL = `${process.env.NEXT_PUBLIC_DOMAIN}api/grab/${clientId}`
    }
    else {
        BASE_URL = `${process.env.NEXT_PUBLIC_DOMAIN}api/grab`
    }
    try {

        const response = await fetch(`${BASE_URL}?phone=${fieldValue}`);
        const data  = await response.json();
   
        const result = data?.usersList.filter((user: Client) => user?.phone === fieldValue)
        return result?.length === 0 ? undefined : 'Phone number already exists';

    } catch (error) {
        console.error('Error checking phone number availability:', error);
        // throw new Error('Failed to check email availability');
    }
};