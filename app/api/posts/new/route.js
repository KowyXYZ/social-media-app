import { connectToDB } from "@/utils/database"
import Post from "@/models/post"
import User from "@/models/user"

export const POST = async(req, res) => {

    const {creator, text, tag, image, id} = await req.json()

    try {
       
           await connectToDB()

            await Post.create({
                creator: creator,
                text: text,
                tag: tag,
                image: image,
                likes: [],
                comments: [],
                id: id
            })

            const creatorUser = await User.findById(id)

            if(creatorUser) {
                creatorUser.posts.push({
                    creator: creator,
                    text: text,
                    tag: tag,
                    image: image,
                    likes: [],
                    comments: [],
                    id: id
                })
              
                await creatorUser.save();
            } else {
                throw new Error('User not found')
            }

        return new Response(JSON.stringify(newPost), {status: 201})
    } catch (error) {
        return new Response('Failed to create a new Post!', {status: 500})
    }
}