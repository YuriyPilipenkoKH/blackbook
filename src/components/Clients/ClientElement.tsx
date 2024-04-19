'use client'
import capitalize from '@/lib/capitalize'
import { ClientCard } from './ClientsStyles.styled'
import ClientTypes from '@/models/ClientTypes'

interface ClientElementProps {
    client: ClientTypes
}

function ClientElement({ client }: ClientElementProps) {

  return (
    <ClientCard>
        <div className='flex gap-2'>
            <span>{capitalize(client?.firstName)}</span>
            <span>{capitalize(client?.lastName)}</span>
        </div>
        <span>{client?.phone}</span>
        <span>{client?.email}</span>

      
    </ClientCard>
  )
}

export default ClientElement
