'use client'
import capitalize from '@/lib/capitalize'
import { ClientCard, PhWrap } from './ClientsStyles.styled'
import ClientTypes from '@/models/ClientTypes'
import RemoveClientModal from '../Modals/RemoveClientModal'
import EditClientModal from '../Modals/EditClientModal'
interface ClientElementProps {
    client: ClientTypes
}

function ClientElement({ client }: ClientElementProps) {

  return (
    <ClientCard>
        <div className='flex gap-2 col-span-2'>
            <span>{capitalize(client?.firstName)}</span>
            <span>{capitalize(client?.lastName)}</span>
        </div>
        <EditClientModal
          client={client}
        />
        <PhWrap className='col-span-2'>
            <span>tel:</span> {client?.phone}
        </PhWrap>
        <PhWrap className='col-span-2'>
            <span>email:</span> {client?.email}
        </PhWrap>
        <RemoveClientModal
          client={client}
        />

      
    </ClientCard>
  )
}

export default ClientElement
