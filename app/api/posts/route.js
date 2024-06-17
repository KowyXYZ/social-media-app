import { connectToDB } from "@/utils/database"
import Post from "@/models/post"

export const GET = async(req, res) => {
    try {
        await connectToDB()

        const posts = await Post.find({})
        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        return new Response("Failed to Fetch Posts", {status: 500})
    }
}