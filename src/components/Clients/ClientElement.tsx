import capitalize from '@/lib/capitalize'
import ClientTypes from '@/models/ClientTypes'
import RemoveClientModal from '../Modals/RemoveClientModal'
import EditClientModal from '../Modals/EditClientModal'
import { ClientCard, PhWrap } from '../serverStyles'
interface ClientElementProps {
    client: ClientTypes
}

function ClientElement({ client }: ClientElementProps) {

  return (
    <div style={ClientCard}>
        <div className='flex gap-2 col-span-2'>
            <span>{capitalize(client?.firstName)}</span>
            <span>{capitalize(client?.lastName)}</span>
        </div>
        <EditClientModal
          client={client}
        />
        <div 
            style={PhWrap}
            className='col-span-2'>
            <span className='w-[50px]'>tel:</span> {client?.phone}
        </div>
        <div 
            style={PhWrap}
            className='col-span-2'>
            <span className='w-[50px]'>email:</span> {client?.email}
        </div>
        <RemoveClientModal
          client={client}
        />

      
    </div>
  )
}

export default ClientElement
