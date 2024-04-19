
import ClientsList from "@/components/Clients/ClientsList";
import CreateClientModal from "@/components/Modals/CreateClientModal";

export default function Home() {
  return (
    <main className= "grid place-items-center py-2">

    <CreateClientModal />
    <ClientsList /> 
    </main>
  );
}
