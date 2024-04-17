'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientSchema, createClientSchemaType } from '@/models/createClient';
import { Input } from 'antd';
import { AuthError, Form_CreateNew } from './FormStyles.styled';



interface CreateClientFormProps {
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    canceling: boolean
}


const CreateClientForm: React.FC<CreateClientFormProps> = ({
    setIsSubmitting,
    canceling,
    setOpen,
}) => {
    const [logError, setLogError] = useState<string>('')
    const {
        register, 
        handleSubmit,
        formState,
        reset,
        watch
    } = useForm<createClientSchemaType>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            
        },
            mode:'all',
            resolver: zodResolver(createClientSchema),
    })
    const {
        errors,
        isDirty,
        isValid ,
        isSubmitting,
    } = formState

    useEffect(() => {
        if(canceling) reset()
        }, [canceling])

  return (
    <>
    <Form_CreateNew >
        <label >firstName:
          <input 
            {...register('firstName')}
            type="text"
          />
        </label >
        <label >lastName:
          <Input 
            {...register('lastName')}
            type="text"
          />
        </label >
        <label >email:
          <Input 
            {...register('email')}
            type="text"
          />
        </label >
        <label >phone:
          <Input 
            {...register('phone')}
            type="text"
          />
        </label >
        <div>
        {( errors?.firstName || errors?.lastName || errors?.email || errors?.phone ) && (
            <AuthError className="autherror">
            {errors.firstName && <div>{errors?.firstName.message}</div>}
            {!errors.firstName && errors.lastName && <div>{errors?.lastName.message}</div>}
            {!errors.firstName && !errors.lastName && errors.email && <div>{errors?.email.message}</div>}
            {!errors.firstName && !errors.lastName && !errors.email && errors.phone && <div>{errors?.phone.message}</div>}
            </AuthError>
        )}
        {logError && <AuthError className="autherror">{logError}</AuthError>}
           </div>
      
    </Form_CreateNew>
    </>
  )
}

export default CreateClientForm
