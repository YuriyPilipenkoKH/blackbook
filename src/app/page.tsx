
import ClientsList from "@/components/Clients/ClientsList";
import CreateClientModal from "@/components/Modals/CreateClientModal";


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
    <main className= "grid gap-1 place-items-center py-2">

      <CreateClientModal />
      <ClientsList  
      page={page} /> 
    </main>
  );
}
