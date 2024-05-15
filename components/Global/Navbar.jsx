import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-[#131313]'>
        <div className='flex justify-between items-center container mx-auto'>
            <div className='flex justify-center items-center text-[24px] uppercase font-black'>
                <img src='/assets/logosm.png' className='w-[100px] invert'/>
                <p>Kowyhub</p>
            </div>

            <div className='flex justify-center items-center gap-2  rounded-2xl'>
               
                <input type="text" placeholder='Search . . .' className='p-2 rounded-2xl w-[300px] outline-none' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

            </div>

            <div className='flex gap-12 justify-center items-center text-[18px] capitalize'>
                <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Home</Link>
                <Link href='/profile' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Profile</Link>
                <Link href='/sign-in' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Sign In</Link>
            </div>
    </div>
    </div>
  )
}

export default Navbar