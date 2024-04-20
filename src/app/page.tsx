
import ClientsList from "@/components/Clients/ClientsList";
import PaginationControls from "@/components/Clients/PaginationControls";
import CreateClientModal from "@/components/Modals/CreateClientModal";

export default function Home() {
  const searchParams = {}; // Provide the searchParams object here
  const hasNextPage = true; // Provide the hasNextPage prop
  const hasPrevPage = false; // Provide the hasPrevPage prop

  return (
    <main className= "grid gap-1 place-items-center py-2">

      <CreateClientModal />
      <ClientsList 
        searchParams={searchParams} /> 
      <PaginationControls 
        hasNextPage={hasNextPage} 
        hasPrevPage={hasPrevPage} />
    </main>
  );
}
