import { connectToDB } from "@/utils/database"
import Post from "@/models/post"

export const GET = async(req, {params}) => {
    try {
        await connectToDB()

        const postIdi = params.postid

        const singlePost = await Post.findById(postIdi)
        
        if (!singlePost) {
            return new Response('Post not found', {status: 404});
        }

        return new Response(JSON.stringify(singlePost), {status: 200})
    } catch (error) {
        return new Response("Failed to Fetch Post", {status: 500})
    }
}