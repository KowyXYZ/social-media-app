"use client"


import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)

   const {data: session} = useSession()

   const [providers, setProviders] = useState(null)


   useEffect(() => {
    const setUpProviders = async() => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders();
  }, [])
   

  return (
    <div className='bg-[#131313]'>
        <div className='flex justify-between items-center container sm:mx-auto px-4'>
            <Link href='/' className='flex justify-center items-center text-[24px] uppercase font-black'>
                <img src='/assets/logosm.png' className='w-[100px] invert'/>
                <p>Kowyhub</p>
            </Link>

            <div className='sm:flex hidden justify-center items-center gap-2  rounded-2xl'>
               
                <input type="text" placeholder='Search . . .' className='p-2 rounded-2xl w-[300px] outline-none' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

            </div>

            <div className='hidden sm:flex gap-12 justify-center items-center text-[18px] capitalize'>
                 
              {session?.user ?
              
              <div className='flex justify-center items-center gap-12'>
                 <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Home</Link>
               
              
                {session?.user ?

                <div className='flex gap-4'>
                   <Link href='/profile' className='flex justify-center items-center gap-4 border-2 rounded-2xl p-2 py-1'>
                  <p>Profile</p>
                  <img className='rounded-full w-10' src={session?.user.image} alt="user image" /> 
                 </Link>
                 
                 <Link href='/create-post' className='flex justify-center items-center gap-4 border-green-500 border-2 rounded-2xl p-2 py-1'>
                  Create Post 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </Link>
                </div>

                 : <></>} 

                 <button onClick={() => signOut()}>Sign Out</button>
              </div> :
               <div className='flex gap-12'>
                <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Home</Link>
                {providers && 
                    Object.values(providers).map((provider) => 
                      (
                        <div className='gap-12 flex '>
                            
                         <button onClick={() => signIn(provider.id)} className='hover:border-b-[#805f5f] border-b-2 border-transparent transition-all ease-in-out delay-100'>Profile</button>
                       
                         <button type="button" key={provider.name} onClick={() => signIn(provider.id)} >
                             Sign In
                          </button>
                        </div>
                      )
                    )
              }
                
               </div> }
            
            </div>
             
            <div className='relative sm:hidden flex'>
              {toggle ? <div onClick={() => setToggle(!toggle)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              </div> : <div  onClick={() => setToggle(!toggle)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>
              </div>}

              {toggle ? <div className='absolute top-10 right-2 bg-[#121212] text-[#fff] border-2 border-[#fff] flex flex-col gap-4 p-5 rounded-2xl w-[150px]'>
                <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Home</Link>
                <Link href='/profile' className='hover:border-b-[#805f5f] border-b-2 border-transparent transition-all ease-in-out delay-100'>Profile</Link>
                <Link href='/sign-in' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Sign In</Link>
              </div> : <></>}
            </div>
    </div>
    </div>
  )
}

export default Navbar