import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Post from "@/models/post";

export const POST = async (req, res) => {
    const { postid, user, comment } = await req.json();

    try {
        await connectToDB();

        const currPost = await Post.findById(postid);
        const likingUser = await User.findById(user);

        if (!currPost || !likingUser ) {
            return new Response('Failed!', { status: 404 });
        }

        currPost.comments.push({ id: likingUser._id, username: likingUser.username, image: likingUser.image, comment: comment })
        
        

        await currPost.save();

        return new Response('Success', { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed!', { status: 500 });
    }
};
