import { connectToDB } from "@/utils/database"
import Post from "@/models/post"

export const POST = async(req, res) => {

    const {creator, text, tag, image} = await req.json()

    try {
       
           await connectToDB()

            await Post.create({
                creator: creator,
                text: text,
                tag: tag,
                image: image,
                likes: [],
                comments: [],
                id: creator.slice(0, 10) + tag.slice(0, 5)
            })

        return new Response(JSON.stringify(newPost), {status: 201})
    } catch (error) {
        return new Response('Failed to create a new Post!', {status: 500})
    }
}