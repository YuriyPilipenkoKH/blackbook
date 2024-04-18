'use client'

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientSchema, createClientSchemaType } from '@/models/createClient';
import { AuthError, Field, Form_CreateNew } from './FormStyles.styled';
import { Btn } from '../Button/Button';
import { createClient } from '@/actions/create';
import { emailAvailable } from '@/lib/emailAvailable';


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
    const ref = useRef<HTMLFormElement>(null)
    console.log(ref)

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

    // const onSubmit = async (formData: createClientSchemaType) => {
    //     setIsSubmitting(true);
    //     try {
    //         // Call server action
    //         await createClient(formData);
    //         // Reset form after successful submission
    //         reset();
    //     } 
    //     catch (error) {
    //         setLogError("Failed to create client: " + error?.message ?? '');
    //     }
    //     setIsSubmitting(false);
    // };

    useEffect(() => {
        if(canceling) reset()
        }, [canceling])

    const emailValue = watch("email");
    useEffect(() => {
        const checkEmailAvailability = async () => {
        if (emailValue && !errors.email) {
        try {
            const result = await emailAvailable(emailValue);
            if (result !== undefined) {
                // Email already exists, set logError
                setLogError(result);
            } else {
                // Reset logError if email is available
                setLogError('');
            }
        } catch (error) {
            // Handle error if emailAvailable function fails
            console.error('Error checking email availability:', error);
        }
        }
        };
    
        checkEmailAvailability();
    }, [emailValue, errors.email]);     

  return (
    <>
    <Form_CreateNew 
    action={async formData => {
        ref.current?.reset()
        await createClient(formData)
    }}
        ref={ref}
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
            validated ={(!errors.email && !logError)? true : false}
    
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
