import Client from "@/models/ClientTypes";


interface UserData {
    email: string;
}

export const emailAvailable = async (fieldValue: string, phone: string): Promise<string | undefined> => {
    let BASE_URL = ''
    if( phone) {
         BASE_URL = `${process.env.NEXT_PUBLIC_DOMAIN}api/grab/${phone}`
    }
    else {
        BASE_URL = `${process.env.NEXT_PUBLIC_DOMAIN}api/grab`
    }

    try {
        // const response = await User.find({email})
        const response = await fetch(`${BASE_URL}?email=${fieldValue}`);
        const data  = await response.json();
        //  console.log('data', data)
 
        const result = data?.usersList.filter((user: Client) => user?.email === fieldValue)
        return result?.length === 0 ? undefined : 'Email already exists';

    } catch (error) {
        console.error('Error checking email availability:', error);
        // throw new Error('Failed to check email availability');
    }
};