"use client"

import Footer from '@/components/Global/Footer'
import Navbar from '@/components/Global/Navbar'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Profile = () => {

  const {data: session} = useSession()


  const postsPlaceholder = [
    {
        postOwner: 'Tobias',
        postDate: '12-02-2024 - 12:52',
        postDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },

    {
        postOwner: 'John1331',
        postDate: '12-02-2024 - 12:52',
        postDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
    },

    {
        postOwner: 'xXxDestroyerxXx',
        postDate: '12-02-2023 - 12:52',
        postDescription: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'
    }
]

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = session?.user?.id;
        const response = await fetch(`/api/users/${userId}`);
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
  }, [session?.user?.id]); // Add session?.user?.id to the dependency array
  



  if (!session) {
    return (
        <div className='py-96 text-center items-center'>
            <p>Please sign in to view your profile.</p>
        </div>
    );
}


  return (
    <div>

        <div className=' flex justify-center items-center py-12 uppercase flex-col'>
            <div className='flex sm:justify-center flex-col sm:flex-row sm:gap-24 gap-4 items-center '>
              <div className='flex justify-center items-center gap-3'>
                  <div className='p-1 border-2 rounded-full'>
                   <img src={session?.user?.image} className='rounded-full' alt="userimg" />
                  </div>
                  <div>
                    <p className='text-[24px]'>{session?.user.name}</p>
                  </div>
              </div>

              <div className='flex gap-8 sm:text-[20px]'>
                <p>Followers: {userData?.followers?.length}</p>
                <p>Following: {userData?.following?.length}</p>
                <p>Posts: {userData?.posts?.length}</p>
              </div>
            </div>

            <div>
            <div className='flex gap-12 flex-col mt-16'>
                {userData?.posts?.length > 0 ?
                 <div>
                    {userData?.posts?.map((post, index) => {
                      return(
                          <div>
                            <p>Hi</p>
                          </div>
                      )
                  })}
                 </div>
                 
                 : 
                 
                 <div>This user doesnt have any posts</div>}
            </div>
            </div>
        </div>

    </div>
  )
}

export default Profile