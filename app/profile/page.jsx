"use client"

import Footer from '@/components/Global/Footer'
import Navbar from '@/components/Global/Navbar'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from 'next/link'

const Profile = () => {

  const {data: session} = useSession()

  const [feedData, setFeedData] = useState([])

  const fetchPosts = async () => {
      try {
          const response = await fetch('/api/posts');
          const data = await response.json();
          setFeedData(data);
      } catch (error) {
          console.error('Failed to fetch posts:', error);
      }
  };

  useEffect(() => {
      fetchPosts();
  }, []); // Fetch posts initially when the component mounts



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


  if (!session) {
    return (
        <div className='py-96 text-center items-center'>
            <p>Please sign in to view your profile.</p>
        </div>
    );
}


const removePost = async(postid) => {

    const hasConfirmed = confirm(
        "Are you sure you want to delete this post?"
      );

      if(hasConfirmed) {
        try {
            const response = await fetch('/api/posts/remove',{
                method: 'DELETE',
                body: JSON.stringify({
                    postid: postid
                })
            })
            if (response.ok) {
                console.log('Successfully removed post');
                fetchPosts()
            } else {
                console.error('Failed to removed post');
            }
        } catch (error) {
            console.log(error)
        }
      }

    
}
  

  return (
    <div>

        <div className=' flex justify-center items-center py-12 uppercase flex-col'>
            <div className='bg-[#131313] rounded-xl p-8 flex sm:justify-center flex-col sm:flex-row sm:gap-24 gap-4 items-center '>
              <div className='flex justify-center items-center gap-3'>
                  <div className='p-1 w-[100px] h-[100px] border-2 rounded-full'>
                   <img src={session?.user?.image} className='rounded-full' alt="userimg" />
                  </div>
                  <div>
                    <p className='text-[24px] uppercase font-black'>{session?.user.name}</p>
                  </div>
              </div>

              <div className='flex gap-8 sm:text-[20px]'>
                <Link href={`/profile/${session?.user?.id}/followers`}>Followers: {userData?.followers?.length}</Link>
                <Link href={`/profile/${session?.user?.id}/following`}>Following: {userData?.following?.length}</Link>
                <p>Posts: {userData?.posts?.length}</p>
              </div>
            </div>

            <div>
            <div className='flex gap-12 flex-col-reverse mt-16'>
            {feedData.length > 0 ? feedData?.filter((item) => item.id === session?.user?.id).map((post, index) => {
                return(
                    <div  key={index} className='border-2 w-[350px] sm:w-[400px] p-5 rounded-2xl uppercase flex flex-col'>
                            <div className='flex justify-between items-center'>
                             <div  className='flex justify-center items-center gap-2'>

                                     <div className='p-1 border-2 rounded-full'>
                                        <img src={post.image} className='rounded-full w-12 h-12' alt="slika" />
                                    </div>

                                    <div>
                                        <p className='uppercase text-[20px] font-semibold'>{post.creator}</p>
                                    </div>

                                    
                                </div>

                                <button onClick={() => removePost(post._id)} className='flex justify-center items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                        </svg>
                                </button>
           
                            </div>
                           
                   
                          <div className='flex flex-col justify-center items-center text-center'>
                             <p className='my-6'>{post.text}</p>
                             <p className='text-blue-400  text-[16px]'>{post.tag}</p>
                          </div>

                          
                            
                            <div className='flex  justify-around items-center mt-6 border-2 rounded-2xl p-2'>

                                <button onClick={() => handleLike(post._id)} className='flex justify-center items-center gap-2'>
                                    <p>{post.likes.length}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                </button>
                                

                                <Link href={`/post/${post._id}`}  className='flex justify-center items-center gap-2'>
                                    <p>{post.comments.length}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                </Link>
                                

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>




                            </div>
                        </div>
                )
            }) : <div>No posts at the moment</div>}
              
                {/* {userData?.posts?.length > 0 ?
                
                 <div className='flex flex-col justify-center items-center gap-16'>
                    
                    {userData?.posts?.map((post, index) => {
                      return(
                        <div key={index} className='border-2 w-[350px] sm:w-[400px] p-5 rounded-2xl flex flex-col'>
                        <div className='flex justify-between items-start'>
                         <div className='flex justify-start items-center gap-2'>

                                 <div className='p-1 border-2 rounded-full'>
                                    <img src={post.image} className=' rounded-full w-12 h-12' alt="slika" />
                                </div>

                                <div>
                                    <p className='text-[20px] font-semibold'>{post.creator}</p>
                                </div>
                            </div>

                          
                        </div>
                       
               
                      <div className='flex flex-col justify-center items-center text-center'>
                         <p className='my-6'>{post.text}</p>
                         <p className='text-blue-400  text-[16px]'>{post.tag}</p>
                      </div>

                      
                        
                        <div className='flex  justify-around items-center mt-6 border-2 rounded-2xl p-2'>

                             <button className='flex justify-center items-center gap-2'>
                                    <p>{post?.likes?.length}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                </button>
                                

                                <button className='flex justify-center items-center gap-2'>
                                    <p>{post?.comments?.length}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                </button>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                            </svg>

                        </div>
                    </div>
                      )
                  })}
                 </div>
                 
                 : 
                 
                 <div>This user doesnt have any posts</div>} */}
            </div>
            </div>
        </div>

    </div>
  )
}

export default Profile