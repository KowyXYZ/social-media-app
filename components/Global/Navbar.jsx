"use client"


import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)

   const {data: session} = useSession()

   const [providers, setProviders] = useState(null)

   const [searchText, setSearchText] = useState('')


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
               
                <input maxlength="16" onChange={(e) => setSearchText(e.target.value)} type="text" placeholder='Search . . .' className='p-2 rounded-2xl w-[300px] outline-none' />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>

                <div className={`absolute left-0 -bottom-40 gap-6 bg-[#e3e3e3] flex-col justify-center p-4 items-start rounded-2xl text-[#212121] w-[300px] ${searchText.length > 0  ? 'flex' : 'hidden'}`}>
                    <Link className='flex justify-center items-center' onClick={() => setSearchText('')} href={`/search/hashtag/${searchText}`}>{searchText} -  in Post Tag #</Link>
                    <Link className='flex justify-center items-center' onClick={() => setSearchText('')} href={`/search/users/${searchText}`}>
                      {searchText} -  in Users
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                      </svg>
                    </Link>

                    <Link className='flex justify-center items-center' onClick={() => setSearchText('')} href={`/search/text/${searchText}`}>
                    {searchText} -  in Post Text
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
                      <path fill-rule="evenodd" d="M10 3c-4.31 0-8 3.033-8 7 0 2.024.978 3.825 2.499 5.085a3.478 3.478 0 0 1-.522 1.756.75.75 0 0 0 .584 1.143 5.976 5.976 0 0 0 3.936-1.108c.487.082.99.124 1.503.124 4.31 0 8-3.033 8-7s-3.69-7-8-7Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-2-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
                    </svg>

                    </Link>
                </div>

            </div>

            <div className='hidden sm:flex gap-12 justify-center items-center text-[18px] capitalize'>
                 
              {session?.user ?
              
              <div className='flex justify-center items-center gap-12'>
                 <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>
                    <button class="before:ease flex justify-center items-center relative h-8 w-32 overflow-hidden border border-white shadow-lg before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-slate-200 before:transition-all before:duration-300 hover:text-[#000] hover:shadow-[#fff] hover:before:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 invert">
                    <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
                  </svg>


                      <span class="relative invert z-10">Home</span>
                    </button>
                  </Link>
               
              
                {session?.user ?

                <div className='flex gap-4'>
                   <Link href='/profile' className='flex justify-center items-center  '>
                   <button class="flex justify-center items-center relative h-8 w-32 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 ">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                    </svg>

                 
                      <span class="relative z-10">Profile</span>
                  </button>
                 
                 </Link>
                 
                 <Link href='/create-post' className='flex justify-center items-center '>
                    <button class="flex  justify-center items-center before:ease relative h-8 w-32 overflow-hidden border border-indigo-600 bg-indigo-600 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-indigo-600 hover:before:-translate-x-40">
                      <span relative="relative z-10">Create </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </Link>
                </div>

                 : <></>} 

                 <button onClick={() => signOut()} class="flex justify-center items-center relative h-8 w-32 overflow-hidden border border-indigo-600  bg-white text-indigo-600 shadow-2xl transition-all before:absolute before:left-0 before:right-0 before:top-0 before:h-0 before:w-full before:bg-indigo-600  before:duration-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0 after:w-full after:bg-indigo-600  after:duration-500 hover:text-white hover:shadow-indigo-600  hover:before:h-2/4 hover:after:h-2/4">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 ">
                  <path fill-rule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clip-rule="evenodd" />
                </svg>

                
                  <span class="relative z-10">Sign Out</span>
                 </button>
              </div> :
               <div className='flex gap-12'>
                <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>
                    <button class="before:ease flex justify-center items-center relative h-8 w-32 overflow-hidden border border-white shadow-lg before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-slate-200 before:transition-all before:duration-300 hover:text-[#000] hover:shadow-[#fff] hover:before:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 invert">
                    <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
                  </svg>


                      <span class="relative invert z-10">Home</span>
                    </button>
                  </Link>
                {providers && 
                    Object.values(providers).map((provider) => 
                      (
                        <div className='gap-12 flex '>
                            
                        
                         <button  onClick={() => signIn(provider.id)} class="flex justify-center items-center relative h-8 w-32 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 ">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clip-rule="evenodd" />
                        </svg>
                        <span class="relative z-10">Profile</span>
                       </button>

                          <button type="button" key={provider.name} onClick={() => signIn(provider.id)} class="before:ease relative h-8 w-32 overflow-hidden border border-indigo-600 bg-indigo-600 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-indigo-600 hover:before:-translate-x-40">
                            <span relative="relative z-10">  Sign In</span>
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
                <Link href='/' className='hover:border-b-[#fff] border-b-2 border-transparent transition-all ease-in-out delay-100'>
                    <button class="before:ease flex justify-center items-center relative h-8 w-32 overflow-hidden border border-white shadow-lg before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-slate-200 before:transition-all before:duration-300 hover:text-[#000] hover:shadow-[#fff] hover:before:-rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5 invert">
                    <path fill-rule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clip-rule="evenodd" />
                  </svg>


                      <span class="relative invert z-10">Home</span>
                    </button>
                  </Link>

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