"use client"

import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${params.id}`);
                const data = await response.json();
                console.log(data);
                setUserData(data); // Wrap data in an array to ensure userData remains an array
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, [params.id]); // Add params.id to dependency array to fetch data when it changes

    return (
        <div>
             <div className=' flex justify-center items-center py-12 uppercase flex-col'>
                    <div className='flex sm:justify-center flex-col sm:flex-row sm:gap-24 gap-4 items-center '>
                        <div className='flex justify-center items-center gap-3'>
                            <div className='p-1 border-2 rounded-full'>
                            <img src={userData?.image} className='rounded-full' alt="userimg" />
                            </div>
                            <div>
                                <p className='text-[24px]'>{userData?.username}</p>
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
    );
};

export default Page;
