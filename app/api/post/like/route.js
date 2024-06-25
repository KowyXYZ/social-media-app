import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Post from "@/models/post";

export const POST = async (req, res) => {
    const { postid, user } = await req.json();

    try {
        await connectToDB();

        const currPost = await Post.findById(postid);
        const likingUser = await User.findById(user);

        if (!currPost) {
            return new Response('Failed!', { status: 404 });
        }

        if (!likingUser) {
            return new Response('Failed!', { status: 404 });
        }

      
        const userAlreadyLiked = currPost.likes.some(like => like.id.equals(likingUser._id));

        if (userAlreadyLiked) {
            // If user already liked, remove from likes array
            currPost.likes = currPost.likes.filter(like => !like.id.equals(likingUser._id));
        } else {
            // If user not liked, add user to likes array
            currPost.likes.push({ id: likingUser._id, username: likingUser.username, image: likingUser.image });
            console.log('User added to likes array');
        }

        await currPost.save();

        return new Response('Success', { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response('Failed!', { status: 500 });
    }
};
