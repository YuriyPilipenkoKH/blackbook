'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, {FC} from 'react'
import { PagBtn } from '../Button/Button'

interface PaginationControlsProps {
    hasNextPage: boolean
    hasPrevPage: boolean
    counter: number
}

const PaginationControls: FC<PaginationControlsProps> = ({
        hasNextPage, 
        hasPrevPage,
        counter
    }) => {

    const router = useRouter()      
    const searchParams = useSearchParams()  

    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '2'


  return (
    <div className='flex gap-2'>
        <PagBtn 
        disabled={!hasPrevPage}
        onClick={() => {
            router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)
        }}
        >
            prev
        </PagBtn>

        <div>
            {page} / {Math.ceil(counter / Number(per_page))}
        </div>

        <PagBtn
         disabled={!hasNextPage}
         onClick={() => {
            router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)
        }}
        >
           next
        </PagBtn>
      
    </div>
  )
}

export default PaginationControls
