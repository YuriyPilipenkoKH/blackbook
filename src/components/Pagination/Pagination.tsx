import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import {  PagBtn } from '../Button/Button';
import Link from 'next/link';
import { highlighted } from "./Pagination.styled";
import PaginationPattern from "./PaginationPattern";

interface PaginationProps {
    totalPages: number | undefined; 
    currentPage: number;
}

function Pagination({totalPages, currentPage}: PaginationProps) {

  return (
    <div className='flex gap-4 items-center justify-center py-2'>
    <Link 
    href={currentPage > 1 ? `/?page=${currentPage - 1}` : ""}>
            <TfiArrowCircleLeft/>
      </Link>

      <div className='flex gap-1 pagination'>
        {totalPages !== undefined && totalPages < 5 ? (
          [...Array(totalPages)].map((_, index) => (
            <Link key={index} href={`/?page=${index + 1}`}>
              <PagBtn
                style={currentPage === index + 1 ? highlighted : undefined}
              >
                {index + 1}
              </PagBtn>
            </Link>
          ))
        ) : (
          <PaginationPattern totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>

      <Link
      href={totalPages !== undefined && currentPage < totalPages ? `/?page=${currentPage + 1}` : ""}>
            <TfiArrowCircleRight />
      </Link>
    </div>
  )
}

export default Pagination


// {[...Array(totalPages)].map((_, index)=> (
//   <Link 
//   key={index}
//   href={`/?page=${index + 1}`}>
//   <PagBtn
//       style={(currentPage === index+1) 
//           ? highlighted 
//           :  undefined}
//        >
//       {index +1}
//   </PagBtn>
//   </Link>
// ))}