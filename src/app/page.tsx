import ClientsList from "@/components/Clients/ClientsList";
import CreateClientModal from "@/components/Modals/CreateClientModal";
import { MainWrap } from "@/components/serverStyles";


export default function Home({
  searchParams,
  }: {
    searchParams: {
      page?: string
      query?: string
    }
  }) {
    const page = searchParams && searchParams['page'] 
        ? parseInt(searchParams['page'] as string, 10) 
        : 1;
    const query = searchParams?.query || ''    

  return (
    <main style={MainWrap}>

      <CreateClientModal />
      <ClientsList  
      page={page} 
      query={query} /> 
    </main>
  );
}
