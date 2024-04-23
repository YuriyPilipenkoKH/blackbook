"use client"

import React, { useState } from 'react';
import {  Modal } from 'antd';
import { AddNewBtn,  CancelBtn } from '../Button/Button';
import { NewContactModalWrap } from './Modals.styled';
import CreateClientForm from '../Forms/CreateClientForm';

const CreateClientModal: React.FC = () => {

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
      setCanceling(!canceling)
        setOpen(false);
    };

  return (
    <NewContactModalWrap >
      <AddNewBtn
        type="button" 
        onClick={showModal}>
            Create Client
      </AddNewBtn>
      <Modal
        className='AddNew_modal relative'
        open={open}
        title={( isSubmitting ) 
            ? "Processing" 
            : "Create new client"}
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
    <p>You can add new client to database </p>
              
    < CreateClientForm
            setIsSubmitting={setIsSubmitting}
            canceling={canceling}
            setOpen={setOpen}
        />

      </Modal>
    </NewContactModalWrap>
  );
};

export default CreateClientModal;