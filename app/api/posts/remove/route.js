import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Post from "@/models/post";


export const DELETE = async(req, res) => {

    const { postid} = await req.json();

    try {
        await connectToDB();

        try {
            await Post.findByIdAndDelete(postid);
        } catch (error) {
            console.log(error)
        }
      
     

        return new Response('Success', {status: 201})
    } catch (error) {
        return new Response('Failed!', {status: 500})
    }
};
