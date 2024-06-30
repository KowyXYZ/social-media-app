"use client"


import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)

   const {data: session} = useSession()

   const [providers, setProviders] = useState(null)

   const [searchText, setSearchText] = useState('')
   console.log(searchText)


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

            <div className='sm:flex relative hidden justify-center items-center gap-2  rounded-2xl'>
               
                <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder='Search . . .' className='p-2 rounded-2xl w-[300px] outline-none' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <div className={`absolute left-0 -bottom-40 gap-6 bg-[#e3e3e3] flex-col justify-center p-4 items-start rounded-2xl text-[#212121] w-[300px] ${searchText.length > 0 ? 'flex' : 'hidden'}`}>
                    <p>{searchText}: in #</p>
                    <p>{searchText}: in Users</p>
                    <p>{searchText}: in Post Text</p>
                </div>

            </div>

            <div className='hidden sm:flex gap-12 justify-center items-center text-[18px] capitalize'>
                 
              {session?.user ?
              
              <div className='flex justify-center items-center gap-12'>
                 <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>
                    <button class="before:ease relative h-8 w-32 overflow-hidden border border-white shadow-lg before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-slate-200 before:transition-all before:duration-300 hover:text-[#000] hover:shadow-[#fff] hover:before:-rotate-180">
                      <span class="relative z-10">Home</span>
                    </button>
                  </Link>
               
              
                {session?.user ?

                <div className='flex gap-4'>
                   <Link href='/profile' className='flex justify-center items-center  '>
                   <button class="relative h-8 w-32 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                      <span class="relative z-10">Profile</span>
                  </button>
                 
                 </Link>
                 
                 <Link href='/create-post' className='flex justify-center items-center '>
                    <button class="flex  justify-center items-center before:ease relative h-8 w-32 overflow-hidden border border-indigo-600 bg-indigo-600 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-indigo-600 hover:before:-translate-x-40">
                      <span relative="relative z-10">New Post</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </Link>
                </div>

                 : <></>} 

                 <button onClick={() => signOut()} class="relative h-8 w-32 overflow-hidden border border-indigo-600  bg-white text-indigo-600 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-indigo-600  before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-indigo-600  after:duration-500 hover:text-white hover:shadow-indigo-600  hover:before:h-2/4 hover:after:h-2/4">
                  <span class="relative z-10">Sign Out</span>
                 </button>
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

              {toggle ? 
              <div className='absolute top-10 right-2 bg-[#121212] text-[#fff] border-2 border-[#fff] flex flex-col gap-4 p-5 rounded-2xl w-[150px]'>
                <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>Home</Link>

                {session?.user ? 
                
                <div className='flex flex-col gap-4 justify-center items-start'>
                  <Link href='/profile' className=''>Profile</Link>
                  <Link href='/create-post' className='rounded-2xl'>Create Post </Link>
                  <button onClick={() => signOut()}>Sign Out</button>
                </div>
                
                : 
                
                <div className='flex justify-center items-start flex-col'>
                    {providers && 
                      Object.values(providers).map((provider) => 
                        (
                          <div className='gap-4 flex flex-col'>
                              
                          <button onClick={() => signIn(provider.id)}>Profile</button>
                        
                          <button type="button" key={provider.name} onClick={() => signIn(provider.id)} >
                              Sign In
                            </button>
                          </div>
                        )
                      )
                } 
                </div>}
                


                
              </div> : <></>}
            </div>
    </div>
    </div>
  )
}

export default Navbar