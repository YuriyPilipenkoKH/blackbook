import { UserButton } from '@clerk/nextjs';

function NavBar() {
  return (
    <div className='flex items-center gap-8 justify-between w-full p-4 border-b-zinc-800 border-b-2'>
        Black — book
      <UserButton 
            afterSignOutUrl="/sign-in"/>
    </div>
  )
}

export default NavBar
