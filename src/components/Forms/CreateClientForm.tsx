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
import { useSearchParams } from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce'

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
    const [phoneError, setPhoneError] = useState<string>('')
    const [isFirstNamelValid, setIsFirstNameValid] = useState<boolean>(false);
    const [isLastNamelValid, setIsLastNameValid] = useState<boolean>(false);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
    const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
    const ref = useRef<HTMLFormElement>(null)
    const searchParams = useSearchParams()  
    const params = searchParams.toString()

    const {
        register, 
        handleSubmit,
        getValues,
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
        reset();
        setLogError('');
        setIsFirstNameValid(false)
        setIsLastNameValid(false)
        setIsEmailValid(false)
        setIsPhoneValid(false)
        ref.current?.reset();

        }, [canceling])

    const emailValue = watch("email");
    // Initialize the debounced callback outside of the component
    const checkEmailAvailability = useDebouncedCallback(async (emailValue: string) => {
        if (emailValue && !errors.email) {
            try {
                const result = await emailAvailable(emailValue, '');
                if (result !== undefined) {
                    // Email already exists, set logError
                    setLogError(result);
                } else {
                    // Reset logError if email is available
                    setLogError('');
                }
            } catch (error) {
                console.error('Error checking email availability:', error);
            }
        }
    }, 800);

    useEffect(() => {
        setLogError('');
        checkEmailAvailability(emailValue);

    }, [emailValue, errors.email]);

    const phoneValue = watch("phone");
    const checkPhoneAvailability = useDebouncedCallback(async (phoneValue: string) => {
    if (phoneValue && !errors.phone) {
    try {
        const result = await phoneAvailable(phoneValue, '');
        if (result !== undefined) {
            // phone already exists, set logError
            setPhoneError(result);
        } else {
            // Reset logError if phone is available
            setPhoneError('');
        }
    } catch (error) {
        console.error('Error checking phone number availability:', error);
    }
    }
    }, 800);

    useEffect(() => {
        setPhoneError('');
        checkPhoneAvailability(phoneValue);
    }, [phoneValue, errors.phone]);     


    const addClient = async(formData: FormData) => {
        try {
            createClient(formData, params )
            .then((response: any) => {
                    const lastName: string | null = response?.lastName;
                if (lastName) {
                    toast.success(`Client ${capitalize(lastName)} created successfully`);
                } else {
                    toast.success(`Client created successfully`);
                }
                ref.current?.reset();
                setOpen(false);
            })
        } 
        catch (error:any) {
            toast.error("Creation failed")
            if(error?.response.data.error){
                setLogError(error?.response.data.error)
            }
            else{
                setLogError("Something went wrong")
            }
        }
    }
    useEffect(() => {
        handleGetValue()
    }, [])


    const handleGetValue = () => {
        const values = getValues(); // Call getValues to retrieve form values
        console.log('Form values:', values);

        if (values.firstName && !errors.firstName) {
            setIsFirstNameValid(true)
        }
        if (values.lastName && !errors.lastName) {
            setIsLastNameValid(true)
        }
        if (values.email && !errors.email) {
            setIsEmailValid(true)
        }
        if (values.phone && !errors.phone) {
            setIsPhoneValid(true)
        }

    };


  return (
    <>
    <Form_CreateNew 
        action={addClient}
        ref={ref}
        autoComplete="off"
        noValidate>
        <label >First name:
          <Field 
            {...register('firstName',
            {onChange: () => handleGetValue()}
            )}
            type="text"
            validated = { isFirstNamelValid }
            error = { !!errors.firstName  }
          />
        </label >
        <label >Last name:
          <Field  
            {...register('lastName',
            {onChange: () => handleGetValue()}
            )}
            type="text"
            validated = { isLastNamelValid }
            error = { !!errors.lastName  }
          />
        </label >
        <label >Email:
          <Field 
            {...register('email',
            {onChange: () => handleGetValue()}
            )}
            type="text"
            validated = { isEmailValid }
            error = { !!errors.email || !!logError }
          />
        </label >
        <label >Phone:
          <Field  
            {...register('phone',
            {onChange: () => handleGetValue()}
            )}
            type="text"
            validated = { isPhoneValid }
            error = { !!errors.phone || !!phoneError }
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
            : "Send" }
        </Btn>
      
    </Form_CreateNew>
    </>
  )
}

export default CreateClientForm
