import { grabClients } from "@/lib/grabClients";
import ClientTypes from "@/models/ClientTypes";
import ClientElement from "./ClientElement";

async function ClientsList() {

    const clients:ClientTypes[] | { error: string; }  = await grabClients()


    if(Array.isArray(clients)) {
    return (
        <div className="grid gap-4 p-2 place-items-center">
            {clients.map((client:ClientTypes, idx:number) => (
                <ClientElement 
                client={client}
                key={idx} />
            ))}
        </div>
    );
    }

}

export default ClientsList;
