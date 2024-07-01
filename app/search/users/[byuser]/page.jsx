"use client"


import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = ({params}) => {


  
  const [feedData, setFeedData] = useState([])
  const {data: session} = useSession()


  const fetchPosts = async () => {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setFeedData(data);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
};

  useEffect(() => {
      fetchPosts();
  }, []); 

  const handleLike = async(postid) => {
    try {
        const response = await fetch('/api/post/like', {
            method: 'POST',
            body: JSON.stringify({
                postid: postid,
                user: session?.user?.id
            })
        })

        if(response.ok) {
            console.log('Success')
            fetchPosts()
        } else {
            console.log(response.status + " " + response.statusText)
            console.log('Failed')
        }
    } catch (error) {
        console.log(error)
    }
}

console.log(feedData)

  return (
    <div className='py-12'>
      <h1 className='text-[24px] uppercase font-black text-center mb-8'>Search for {params.byuser} in Users</h1>
      <div className='gap-16 flex flex-col-reverse items-center justify-center'>
        {feedData?.length > 0 ? feedData?.filter((item) => item.username === params.byuser || item.username.includes(params.byuser)).map((user, index) => {
            return(
              <div key={index} className='flex justify-between items-center  p-2 px-3 rounded-full  border-2 w-[300px]'>
                        <Link href={`/profile/${user.id}`} className='flex justify-between items-center gap-24 '>
                            <img className='rounded-full w-12' src={user?.image}/>
                            <p className='text-[20px]'>{user?.username}</p>
                        </Link>
                      
              </div>
            )
        }) : 
        
        <div>
            <p>No search for {params.byuser}</p>
        </div>}
      </div>
    </div>
  )
}

export default page