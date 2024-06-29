import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Post from "@/models/post";
import { v4 as uuid } from "uuid";

export const POST = async (req, res) => {
    const { postid, user, comment } = await req.json();

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

    try {
        await connectToDB();

        const currPost = await Post.findById(postid);
        const likingUser = await User.findById(user);

        if (!currPost || !likingUser ) {
            return new Response('Failed!', { status: 404 });
        }

        currPost.comments.push({ id: small_id, creator: likingUser._id, username: likingUser.username, image: likingUser.image, comment: comment })
        
        

        await currPost.save();

        return new Response('Success', { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed!', { status: 500 });
    }
};
