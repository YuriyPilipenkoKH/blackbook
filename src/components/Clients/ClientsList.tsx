import { grabClients } from "@/lib/grabClients";
import ClientTypes from "@/models/ClientTypes";
import ClientElement from "./ClientElement";
import Pagination from "./Pagination";

interface ClientsListProps {
    page:number
}

export default async function ClientsList({page}:ClientsListProps)  {


    const data = await grabClients(page)
    const counter = data?.clientsCount

    if(Array.isArray(data.plainList)) {
    return (
        <div>
            <div>{counter}</div>
            <div className="grid gap-4 p-2 place-items-center">
                {data.plainList.map((client:ClientTypes, idx:number) => (
                    <ClientElement
                    client={client}
                    key={idx} />
                ))}
            </div>
            <Pagination 
            totalPages={data?.totalPages}
            currentPage={page}
            />
        </div>
    );
    }

}



// async function ClientsList(searchParams: {[key: string]: string | string[] | undefined})  {