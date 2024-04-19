"use client"

import React, { useState } from 'react';
import {  Modal } from 'antd';
import {   CancelBtn, FlatBtn } from '../Button/Button';
import { NewContactModalWrap } from './Modals.styled';
import { FiEdit } from 'react-icons/fi';
import EditClientForm from '../Forms/EditClientForm';
import ClientTypes from '@/models/ClientTypes';

interface EditClientModalProps {
    client: ClientTypes
}

const EditClientModal: React.FC<EditClientModalProps> = ({client}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [canceling, setCanceling] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
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
    <NewContactModalWrap >
      <FlatBtn 
        onClick={showModal}>
            <FiEdit/>
      </FlatBtn>
      <Modal
        className='Edit_modal relative'
        open={open}
        title={( isSubmitting ) 
            ? "Processing" 
            : "Edit"}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
        <CancelBtn
            className='cancel_btn w-[80px] ml-[200px]'
            key="back" 
            disabled={ isSubmitting }
            onClick={handleCancel}>
        Cancel
        </CancelBtn>,
        ]}
      >
    <p>You can edit clients properties </p>
              
    < EditClientForm
            setIsSubmitting={setIsSubmitting}
            canceling={canceling}
            setOpen={setOpen}
            client={client}            
        />

      </Modal>
    </NewContactModalWrap>
  );
};

export default EditClientModal