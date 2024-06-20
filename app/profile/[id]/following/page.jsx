"use client"


import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = ({params}) => {

    const {data: session} = useSession()

    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userId = session?.user?.id;
          const response = await fetch(`/api/users/${params.id}`);
          const data = await response.json();
          setUserData(data);
          console.log(setUserData); // Log the fetched data, not userData
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      if (session?.user?.id) {
        fetchUserData();
      }
    }, [session?.user?.id]);



    if (!userData) {
        return (
            <div className='py-96 text-center items-center'>
                <p>Please sign in to view your profile.</p>
            </div>
        );
    }
    
    console.log(userData)

  return (
    <div className='w-full py-24'>
        <h1 className='uppercase text-[22px] font-black text-center'>{userData?.username} Following</h1>
        <div className='flex justify-center items-center flex-col gap-5 mt-8'>
            {userData?.posts?.length > 0 ? userData?.following?.map((followingUser, i) => {
                return(
                    <div key={i} className='flex justify-between p-2 px-3 rounded-full items-center border-2 w-[300px]'>
                        <Link href={`/profile/${followingUser.id}`} className='flex justify-center gap-4 items-center'>
                            <img className='rounded-full w-12' src={followingUser?.image}/>
                            <p className='text-[18px]'>{followingUser?.username}</p>
                        </Link>
                      
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )
            }): <div className='flex justify-center items-center text-[24px]'>This user doesnt follow anyone</div>}
        </div>
    </div> 
  )
}

export default page