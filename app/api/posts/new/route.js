import { connectToDB } from "@/utils/database"
import Post from "@/models/post"

export const GET = async(req, res) => {

    const {creator, text, tag} = await req.json()

    try {
        await connectToDB()

        const newPost =  new Post({
            creator: creator,
            text: text,
            tag: tag
        })

        await newPost.save()

        return new Response(JSON.stringify(newPost), {status: 201})
    } catch (error) {
        return new Response('Failed to create a new Post!', {status: 500})
    }
}