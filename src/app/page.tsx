import ClientsList from "@/components/Clients/ClientsList";
import CreateClientModal from "@/components/Modals/CreateClientModal";
import { MainWrap } from "@/components/serverStyles";


export default function Home({
  searchParams,
  }: {
    searchParams: {[key: string]: string | string[] | undefined}
  }) {
    const page = 
        searchParams && searchParams['page'] 
        ? parseInt(searchParams['page'] as string, 10) 
        : 1;

  return (
    <main style={MainWrap}>

      <CreateClientModal />
      <ClientsList  
      page={page} /> 
    </main>
  );
}
