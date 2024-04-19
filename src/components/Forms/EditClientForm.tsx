'use client'

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientSchema, createClientSchemaType } from '@/models/createClient';
import { AuthError, Field, Form_CreateNew } from './FormStyles.styled';
import { Btn } from '../Button/Button';
import { createClient } from '@/actions/create';
import { emailAvailable } from '@/lib/emailAvailable';
import { phoneAvailable } from '@/lib/phoneAvailable';
import toast from 'react-hot-toast';
import capitalize from '@/lib/capitalize';
import ClientTypes from '@/models/ClientTypes';


interface EditClientFormProps {
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    canceling: boolean
    client: ClientTypes
}

const EditClientForm: React.FC<EditClientFormProps> = ({
    setIsSubmitting,
    canceling,
    setOpen,
    client
}) => {
    const [logError, setLogError] = useState<string>('')
    const [phoneError, setPhoneError] = useState<string>('')
    const ref = useRef<HTMLFormElement>(null)

    const {
        register, 
        handleSubmit,
        formState,
        reset,
        watch
    } = useForm<createClientSchemaType>({
        defaultValues: {
            firstName: client?.firstName || '',
            lastName: client?.lastName || '',
            email: client?.email || '',
            phone: client?.phone || '',
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

    const emailValue = watch("email");
    useEffect(() => {
        const checkEmailAvailability = async () => {
        if (emailValue && !errors.email) {
        try {
            const result = await emailAvailable(emailValue, client?.phone);
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

    // const phoneValue = watch("phone");
    // useEffect(() => {
    //     const checkPhoneAvailability = async () => {
    //     if (phoneValue && !errors.phone) {
    //     try {
    //         const result = await phoneAvailable(phoneValue);
    //         if (result !== undefined) {
    //             setPhoneError(result);
    //         } else {
    //             setPhoneError('');
    //         }
    //     } catch (error) {
    //         console.error('Error checking phone number availability:', error);
    //     }
    //     }
    //     };
    
    //     checkPhoneAvailability();
    // }, [phoneValue, errors.phone]);     

    const editClient = async(formData: FormData) => {
        try {
            createClient(formData)
            .then((response: any) => {
                console.log(response)
                const lastName: string | null = response?.lastName;
                if (lastName) {
                    toast.success(`Client ${capitalize(lastName)} edited successfully`);
                } else {
                    toast.success(`Client edited successfully`);
                }
                ref.current?.reset();
                setOpen(false);
            })
        } 
        catch (error:any) {
            toast.error("Edition failed")
            if(error?.response.data.error){
                setLogError(error?.response.data.error)
            }
            else{
                setLogError("Something went wrong")
            }
        }
    }

  return (
    <>
    <Form_CreateNew 
        action={editClient}
        ref={ref}
        autoComplete="off"
        noValidate>
        <label >First name:
          <Field 
            {...register('firstName')}
            type="text"
            validated ={!errors.firstName ? true : false}

          />
        </label >
        <label >Last name:
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
            validated ={(!errors.phone && !phoneError) ? true : false}
       
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
        {( logError || phoneError ) && (
            <AuthError className="autherror">
                {logError && <div>{logError}</div>}
                {!logError && phoneError && <div>{phoneError}</div>}
            </AuthError>
        )  }
           </div>
        <Btn 
          className='contact-create w-[80px] h-[36px] rounded-md absolute bottom-[-41px]'
          disabled={isSubmitting || !isDirty || !isValid}
          type="submit"  
          >
           {( isSubmitting ) 
            ? "Submitting" 
            : "Apply" }
        </Btn>
      
    </Form_CreateNew>
    </>
  )
}

export default EditClientForm