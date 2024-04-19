'use client'
import capitalize from '@/lib/capitalize'
import { ClientCard, PhWrap } from './ClientsStyles.styled'
import ClientTypes from '@/models/ClientTypes'
import { FlatBtn } from '../Button/Button'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Fill } from "react-icons/ri";
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
        <FlatBtn>
            <FiEdit/>
        </FlatBtn>
        <PhWrap className='col-span-2'><span>tel:</span> {client?.phone}</PhWrap>
        <PhWrap className='col-span-2'><span>email:</span> {client?.email}</PhWrap>
        <FlatBtn>
            <RiDeleteBin2Fill/>
        </FlatBtn>

      
    </ClientCard>
  )
}

export default ClientElement
