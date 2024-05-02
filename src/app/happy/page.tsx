import CoatOfArms from '@/components/icons/coatOfArms'
import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className=''>
      <div className='h-wr'>
				<div className='happy relative bg-gradient-to-r from-indigo-400 to-green-800'>
            З Днем народження ! 
            <Image  src='https://res.cloudinary.com/dwdkw1a4j/image/upload/v1714576993/happy%20birthday/eretpddh6rv8r0veb26c.png'
             alt='alt' 
             width={60}  
             height={120}/>
            <div className='circle-r  bg-green-700 '>
							<CoatOfArms  />
					</div>
				</div>
			</div>
		</div>
  )
}

export default page
