import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import {  PagBtn } from '../Button/Button';
import styles from './ClientsStyles.module.css'
import Link from 'next/link';

interface PaginationProps {
    totalPages: number | undefined; // Make totalPages optional
    currentPage: number;
}

function Pagination({totalPages, currentPage}: PaginationProps) {
    // console.log('totalPages', totalPages, 'currentPage',currentPage)

  return (
    <div className='flex gap-2 items-center justify-center py-2'>
    <Link 
    href={currentPage > 1 ? `/?page=${currentPage - 1}` : ""}>
            <TfiArrowCircleLeft/>
      </Link>
      <div className='flex gap-1'>
        {[...Array(totalPages)].map((_, index)=> (
            <Link 
            key={index}
            href={`/?page=${index + 1}`}>
            <PagBtn
                className={`${currentPage === index+1 ? styles.circle : '' }`}>
                {index +1}
            </PagBtn>
            </Link>
        ))}
      </div>

      <Link
      href={totalPages !== undefined && currentPage < totalPages ? `/?page=${currentPage + 1}` : ""}>
            <TfiArrowCircleRight />
      </Link>
    </div>
  )
}

export default Pagination
