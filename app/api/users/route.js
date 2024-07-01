import { connectToDB } from "@/utils/database"
import Post from "@/models/post"
import User from "@/models/user"


export const GET = async(req, res) => {
    try {
        await connectToDB()

        const posts = await User.find({})
        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        return new Response("Failed to Fetch Users", {status: 500})
    }
}