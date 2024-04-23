'use client'

import { searchSchema, searchSchemaType } from '@/models/searchSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, {  ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { BiSearchAlt } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { StyledSearchingForm } from './FormStyles.styled';
import { retrieveUserId } from '@/lib/retrieveUserId';
import { useRouter, useSearchParams } from 'next/navigation';
import { FlatBtn } from '../Button/Button';


function SearchingForm() {
//   const {  userId, setQuery } = useContext(UserContext as React.Context<UserContextType>);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState<string | undefined>();
     
    const router = useRouter() 
    const searchParams = useSearchParams()
    const params = searchParams.toString()
    const newSearchParams = new URLSearchParams(params); // Create a new URLSearchParams object from the current params
    console.log('Params', {params})


    // const formRef  = useRef<HTMLDivElement>(null); // Reference to the form div element
    const {
        register, 
        handleSubmit,
        formState,
        reset
       } = useForm<searchSchemaType>({
        defaultValues: {
            query: '',
       },
        mode:'all',
        resolver: zodResolver(searchSchema),
    })
    const {
        errors,
        isDirty,
      } = formState
    const onSubmit = async (data: searchSchemaType) => {
        console.log('data', data)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const queryValue = e.target.value;
       
        newSearchParams.set('query', queryValue); // Set the 'query' parameter with the new input value
        const newParamsString = newSearchParams.toString(); // Get the updated search parameters as a string
        router.push(`/?${newParamsString}`);
      };
    const setEmptyQuery =() => {
        newSearchParams.delete('query'); // Remove the query parameter
        const newParamsString = newSearchParams.toString();
        router.push(`/?${newParamsString}`);
    }

    const cleaner =() => {
        reset()
        setEmptyQuery()
    }
    const shut =() => {
        reset()
        setEmptyQuery()
        setOpen(false)
    }

    useEffect(() => {
        const fetchData = async () => {
        const id = await retrieveUserId();
        setUserId(id);
        };

        fetchData();
    }, []);

  return (
    <>
      { !open && userId &&  (      
        <FlatBtn 
        className='search_icon_btn bg-yellow-300'
        onClick={() => setOpen(true)}
        type='button'>
           <BiSearchAlt size={25} className='fill-slate-900'/>
        </FlatBtn>
      )}
       { open &&  (    
        <StyledSearchingForm
        onSubmit={handleSubmit(onSubmit)}
        className='search-form'
        autoComplete="off"
        noValidate>
            <label >
            <input
                {...register('query',
                 {onChange: handleInputChange}   
                )}
                type="text"
                />
            </label>
            <div className='search_btn_wrap absolute'>
              {isDirty && (
              <button 
              onClick={cleaner}
              type='button'>
                <IoCloseCircleOutline size={25} className='text-violet-950'/>
              </button>
              )}
              <button type='submit'>
                <BiSearchAlt size={25} />
              </button>
            </div>
            <button 
            onClick={shut}
            className='shut'>

            </button>
        </StyledSearchingForm>
       )}
    </>
  )
}

export default SearchingForm