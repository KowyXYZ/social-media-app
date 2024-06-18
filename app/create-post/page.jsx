"use client"

import React, { useEffect, useState } from 'react'
import {useSession } from 'next-auth/react'
import Form from '@/components/Form'
import { Router, useRouter } from 'next/navigation'



const page = () => {
     const router = useRouter()
    const {data: session} = useSession()

    const [submiting, setSubmiting] = useState(false)
    const [post, setPost] = useState({
      text: '',
      tag: '',
    })


    const createPost = async(e) => {
      e.preventDefault()
      setSubmiting(true)

      try {
        const response = await fetch('/api/posts/new', {
          method: "POST",
          body: JSON.stringify({
            creator: session?.user?.name,
            text: post.text,
            tag: post.tag,
            image: session?.user?.image,
            id: session?.user?.id
          })
        })

        if(response.ok){
          router.push('/')
        }

      } catch (error) {
        console.log(error)

      } finally {
        setSubmiting(false)
      }
    }

    if (!session) {
        return (
            <div className='py-96 text-center items-center'>
                <p>Please sign in to view this page.</p>
            </div>
        );
    }

  return (
    <div>
        <Form post={post} setPost={setPost} submiting={submiting} handleSubmit={createPost}/>
    </div>
  )
}

export default page