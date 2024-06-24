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

        // Check if the user has already liked the post
        const userLikedIndex = currPost.likes.findIndex((item) => item.id === likingUser._id);

        if (userLikedIndex !== -1) {
            // If user already liked, remove from likes array
            currPost.likes.splice(userLikedIndex, 1);
            console.log('User removed from likes array');
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
