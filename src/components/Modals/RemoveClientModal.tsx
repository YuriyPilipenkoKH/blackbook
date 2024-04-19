
import ClientTypes from '@/models/ClientTypes'
import React, { useState } from 'react'
import {  CancelBtn, FlatBtn } from '../Button/Button'
import { Modal } from 'antd'
import { RiDeleteBin2Fill } from 'react-icons/ri'
import capitalize from '@/lib/capitalize'
import RemoveClientForm from '../Forms/RemoveClientForm'

interface RemoveClientModalProps {
    client: ClientTypes
}

const RemoveClientModal: React.FC<RemoveClientModalProps> = ({client}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
        setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setCanceling(true)
        setOpen(false);
    };
  return (
    <>
    <FlatBtn 
    onClick={showModal}>
        <RiDeleteBin2Fill/>
    </FlatBtn>
    <Modal
        className=' Del_Modal relative'
        open={open}
        title={( loading ) 
            ? "Processing" 
            : `Are you sure deleting ${capitalize(client?.lastName)}?`}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[ 

        <CancelBtn
            key="back" 
            className='cancel_btn w-[70px] rounded-md '
            disabled={ loading }
            onClick={handleCancel}>
        Cancel
        </CancelBtn>,
        <RemoveClientForm 
            client={client}
            key="form" />
         ]}
    >
    <p>
         There will be no return....
    </p>



    </Modal>
    </>
  )
}

export default RemoveClientModal

