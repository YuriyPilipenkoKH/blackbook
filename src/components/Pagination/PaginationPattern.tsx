import Link from 'next/link'
import React from 'react'
import { PagBtn } from '../Button/Button'
import { highlighted } from './Pagination.styled'

interface PaginationPatternProps {
    totalPages: number | undefined
    currentPage:number | undefined
}

function PaginationPattern({totalPages, currentPage}:PaginationPatternProps) {

  return (
    <div className='flex items-center gap-2'>
      <Link 
        href={`/?page=${1}`}>
        <PagBtn
            style={(currentPage === 1) ? highlighted :  undefined}
                >
            {1}
        </PagBtn>
        </Link>
      <Link 
        href={`/?page=${2}`}>
        <PagBtn
            style={(currentPage === 2) ? highlighted :  undefined}
                >
            {2}
        </PagBtn>
        </Link>
        <div>....</div>
        <Link 
        href={totalPages !== undefined ? `/?page=${totalPages - 1}` : '/'}>
        <PagBtn
            style={(currentPage === (totalPages !== undefined ? totalPages-1 : '')) 
                ? highlighted :  undefined}
                >
            {totalPages !== undefined ? totalPages-1 : ''}
        </PagBtn>
        </Link>
      <Link 
        href={`/?page=${totalPages}`}>
        <PagBtn
            style={(currentPage === totalPages) ? highlighted :  undefined}
                >
            {totalPages}
        </PagBtn>
        </Link>
    </div>
  )
}

export default PaginationPattern
