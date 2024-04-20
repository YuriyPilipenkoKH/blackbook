import { grabClients } from "@/lib/grabClients";
import ClientTypes from "@/models/ClientTypes";
import ClientElement from "./ClientElement";

async function ClientsList({
    searchParams,
    }: {
      searchParams: {[key: string]: string | string[] | undefined}
    }) {

    const clients:ClientTypes[] | { error: string; }  = await grabClients()
    let counter = 0
    if(Array.isArray(clients)) {
        counter = clients.length
    }

        // pagination
        const page = searchParams && searchParams['page'] ? searchParams['page'] : '1';
        const perPage = searchParams && searchParams['per_page'] ? searchParams['per_page'] : '3';
        
        const start  = (Number(page) -1) * Number(perPage)  // 0, 5, 10
        const end  = start +  Number(perPage) // 5, 10, 15
        let entries:ClientTypes[] = []
        if(Array.isArray(clients)) {
             entries = clients.slice(start, end)
        }

    if(Array.isArray(clients)) {
    return (
        <>
        <div>{counter}</div>
        <div className="grid gap-4 p-2 place-items-center">
            {entries.map((client:ClientTypes, idx:number) => (
                <ClientElement
                client={client}
                key={idx} />
            ))}
        </div>
        </>
    );
    }

}

export default ClientsList;
