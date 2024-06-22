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
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user already liked the post by both id and username
        const userLikedIndex = currPost.likes.findIndex(like => like.id.toString() === likingUser._id.toString() && like.username === likingUser.username);

        if (userLikedIndex === -1) {
            // User hasn't liked the post, so add their like
            currPost.likes.push({ id: likingUser._id, username: likingUser.username, image: likingUser.image });
            console.log('User added to likes array');
        } else {
            // User already liked the post, so remove their like
            currPost.likes.splice(userLikedIndex, 1);
            console.log('User removed from likes array');
        }

        await currPost.save();


        return new Response('Success', {status: 201})
    } catch (error) {
        return new Response('Failed!', {status: 500})
    }
};
