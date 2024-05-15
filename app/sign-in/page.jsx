import Footer from '@/components/Global/Footer'
import Navbar from '@/components/Global/Navbar'
import Link from 'next/link'
import React from 'react'

const SignIn = () => {
  return (
   <div>
     <Navbar/>
        <div className='flex justify-center flex-col items-center py-44'>
            <form className='gap-8 flex flex-col justify-center items-center'>
                <h1 className='text-[32px] sm:text-[44px] uppercase font-black'>Sign In</h1>

                <div className='gap-5 flex justify-center items-center flex-col'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <label>Email</label>
                        <input type='email' className='p-1 px-3 w-[300px] text-[20px]  outline-none'/>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <label>Password</label>
                        <input type='password' className='p-1 px-3 w-[300px] text-[20px]  outline-none'/>
                    </div>

                    <button className='border-2 mt-5 border-[#fff] w-full py-2 hover:bg-[#fff] hover:text-[#000] ease-in-out transition-all'>Sign In</button>
                </div>
            </form>

            <div className='mt-8 text-center gap-2 flex justify-center items-center flex-col'>
                <div>
                    <p>Sign In with Google</p>
                </div>
                <p>Don't have an account? <span className='underline'>Click Here to register</span></p>
              
            </div>
        </div>

        <Footer/>
   </div>
  )
}

export default SignIn