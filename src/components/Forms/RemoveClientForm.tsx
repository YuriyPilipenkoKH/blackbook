import { removeClient } from '@/actions/remove'
import React from 'react'
import { BtnDelete } from '../Button/Button'
import ClientTypes from '@/models/ClientTypes'

interface RemoveClientFormProps {
    client : ClientTypes
}

function RemoveClientForm({client}:RemoveClientFormProps) {

  return (
    <form
    action={removeClient}
    >
      <input hidden name='phone' value={client?.phone} />
      <input hidden name='lastName' value={client?.lastName} />
        <BtnDelete  type='submit'>
            Del
        </BtnDelete>
    </form>
  )
}

export default RemoveClientForm

