import { grabClients } from "@/lib/grabClients";
import ClientTypes from "@/models/ClientTypes";
import ClientElement from "./ClientElement";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar";
import { CardContainer, ClientsListWrap } from "./Clients.styled";
import { mapAndAddContactIds } from "@/lib/mapAndAddContactIds";
import { mapAndRemoveContactIds } from "@/lib/mapAndRemoveContactIds";

interface ClientsListProps {
    page:number 
    query:string
}

export default async function ClientsList({page, query}:ClientsListProps)  {
	//  mongo tryouts(:)
	await	mapAndAddContactIds()
	// await mapAndRemoveContactIds()

    const data = await grabClients(page, query)
    const counter = data?.clientsCount



    if(Array.isArray(data.plainList)) {
    return (
			<div style={ClientsListWrap}>
				<SearchBar 
					counter={counter}/>
					<div style={CardContainer}>
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


