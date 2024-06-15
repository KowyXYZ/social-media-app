import Link from 'next/link'
import React from 'react'

const Form = ({
    post,
    setPost,
    submiting,
    handleSubmit,
})  => {
  return (
    <div className='flex justify-center items-center container mx-auto py-24 flex-col'>
        <h1 className='text-[#fff] text-[32px] uppercase font-black'>Create a post</h1>
        <p className='text-gray-400'>Create and share amazing posts on kowyhub, social media platform where you can express your imagination and create fun stuff.</p>
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center x gap-5 py-12 border-2 p-8 mt-12 rounded-2xl'>
            <label className='flex justify-center  flex-col items-center gap-5'>
                <span className=" font-semibold text-base text-gray-400">Your Post Text </span>
                <textarea value={post.text} onChange={(e) => setPost({...post, text: e.target.value})} type='text' placeholder="Write your text here..." required className='p-2 w-[350px] h-[200px] flex  outline-none' style={{resize: 'none'}}/>     
            </label>

            <label className='flex justify-center flex-col items-center gap-5'>
                <span className=" font-semibold text-base text-gray-400">Tag {' '}<span className="font-normal">(#product, #webdevelopment, #idea)</span></span>
                <input value={post.tag}  onChange={(e) => setPost({...post, tag: e.target.value})}  type='text' placeholder="#tag" required className="p-2 w-[350px] outline-none"/>     
            </label>

            <div className="flex-end  gap-4">
                <Link href='/' className="text-gray-500 text-sm">Cancel</Link>
                <button disable={submiting} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white" type="submit">Post</button>
            </div>
        </form>
    </div>
  )
}

export default Form