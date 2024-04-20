'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, {FC} from 'react'
import { PagBtn } from '../Button/Button'

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
}

const PaginationControls: FC<PaginationControlsProps> = ({
        // hasNextPage, 
        // hasPrevPage
    }) => {

    const router = useRouter()      
    const searchParams = useSearchParams()  

    const page = searchParams.get('page') ?? '1'
    const perPage = searchParams.get('perPage') ?? '5'


  return (
    <div className='flex gap-2'>
        <PagBtn 
        // className='bg-blue-500 text-slate-300 p-1'
        // disabled={!hasPrevPage}
        onClick={() => {
            router.push(`/?page=${Number(page) - 1}&perPage=${perPage}`)
        }}
        >
            prev
        </PagBtn>

        <div>
            {page} / {Math.ceil(10 / Number(perPage))}
        </div>

        <PagBtn
        //  className='bg-blue-500 text-slate-300 p-1'
         // disabled={!hasNextPage}
         onClick={() => {
            router.push(`/?page=${Number(page) + 1}&perPage=${perPage}`)
        }}
        >
           next
        </PagBtn>
      
    </div>
  )
}

export default PaginationControls
