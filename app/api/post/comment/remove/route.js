import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Post from "@/models/post";



export const PATCH = async(req, res) => {
    if (req.method !== 'PATCH') {
        return new Response('METHOD NOT ALLOWED!', {status: 405})
    }

    const { commentId, postId } = await req.json();

    const postToFind = await Post.findById(postId)

    if(!postToFind){
        return new Response('Failed!', { status: 404 });
    }

    try {
        await connectToDB();

        postToFind.comments = postToFind.comments[0].filter((item, index) => item.id !== commentId)
        console.log('Removed Comment')

        await postToFind.save()


        return new Response('Success', {status: 201})
    } catch (error) {
        return new Response('Failed!', {status: 500})
    }
};
