import { removeClient } from '@/actions/remove'
import React, { useRef } from 'react'
import { BtnDelete } from '../Button/Button'
import ClientTypes from '@/models/ClientTypes'
import toast from 'react-hot-toast'
import capitalize from '@/lib/capitalize'
import { useSearchParams } from 'next/navigation'

interface RemoveClientFormProps {
    client : ClientTypes
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function RemoveClientForm({client, setOpen}:RemoveClientFormProps) {
    const ref = useRef<HTMLFormElement>(null)
    const searchParams = useSearchParams()  
    const params = searchParams.toString()

    const delClient = async(formData: FormData) => {
        try {
        removeClient(formData, params)
        .then((response: any) => {
            console.log(response)
            const lastName: string | null = response?.lastName;
            if (lastName) {
                toast.success(`Client ${capitalize(lastName)} successfully removed`);
            } else {
                toast.success(`Client successfully removed`);
            }
            ref.current?.reset();
            setOpen(false);
        })
        } 
        catch (error:any) {
            toast.error("Removal failed")
        }
    }

  return (
    <form
    action={delClient}
    >
      <input 
        hidden 
        name='clientId' 
        value={client?.clientId} 
        onChange={()=>{}}/>
      <input 
        hidden 
        name='lastName' 
        value={client?.lastName} 
        onChange={()=>{}}/>
        <BtnDelete  type='submit'>
            Delete
        </BtnDelete>
    </form>
  )
}

export default RemoveClientForm

