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

      
        // const userAlreadyLiked = currPost.likes.some(like => like.id.equals(likingUser._id));

        const userIndex = currPost.likes.findIndex((item, index) => item.filter((el, i) => el.username === likingUser.username))
        console.log(userIndex)
        // if (userAlreadyLiked) {
        //     // If user already liked, remove from likes array
        //     currPost.likes = currPost.likes.map((item, index) => item.filter((el, i) => el.username !== likingUser.username))
        //     currPost.likes = currPost.likes.filter(array => array.length > 0);
        //     console.log('removed from likes array')
            
        // } else {
        //     // If user not liked, add user to likes array
        //     currPost.likes.push({ id: likingUser._id, username: likingUser.username, image: likingUser.image });
        //     console.log('User added to likes array');
        // }

        if (userIndex !== -1) {
            // If user already liked, remove user from likes array
            currPost.likes.splice(userIndex, 1);
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
