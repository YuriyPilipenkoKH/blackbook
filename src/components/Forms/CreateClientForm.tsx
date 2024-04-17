'use client'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientSchema, createClientSchemaType } from '@/models/createClient';
import { Input } from 'antd';
import { AuthError, Field, Form_CreateNew } from './FormStyles.styled';
import { Btn } from '../Button/Button';
import { createClient } from '@/actions/create';



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
        formState,
        reset,
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
    <Form_CreateNew 
    action={createClient}
    autoComplete="off"
    noValidate>
        <label >firstName:
          <Field 
            {...register('firstName')}
            type="text"
            validated ={!errors.firstName ? true : false}

          />
        </label >
        <label >lastName:
          <Field  
            {...register('lastName')}
            type="text"
            validated ={!errors.lastName ? true : false}

          />
        </label >
        <label >email:
          <Field 
            {...register('email')}
            type="text"
            validated ={!errors.email ? true : false}
    
          />
        </label >
        <label >phone:
          <Field  
            {...register('phone')}
            type="text"
            validated ={!errors.phone ? true : false}
       
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
        <Btn 
          className='contact-create w-[80px] h-[36px] rounded-md absolute bottom-[-21px]'
          disabled={isSubmitting || !isDirty || !isValid}
          type="submit"  
          >
           {( isSubmitting ) 
            ? "Process" 
            : "Send" }
        </Btn>
      
    </Form_CreateNew>
    </>
  )
}

export default CreateClientForm
