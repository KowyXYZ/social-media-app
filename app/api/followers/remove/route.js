import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const PATCH = async(req, res) => {
    if (req.method !== 'PATCH') {
        return new Response('METHOD NOT ALLOWED!', {status: 405})
    }

    const { postid, id} = await req.json();

    try {
        await connectToDB();

        const creatorUser = await User.findById(postid); // Assuming postid is the creator's user ID
        const userThatFollows = await User.findById(id); // Assuming id is the user who is following

        if (!creatorUser || !userThatFollows) {
            throw new Error('User not found');
        }

        // Check if userThatFollows is already following creatorUser
        const isAlreadyFollowing = creatorUser.followers.some(follower => follower.id === id);
        const ifYourself = creatorUser === userThatFollows
        if (isAlreadyFollowing && !ifYourself) {
            creatorUser.followers = creatorUser.followers.filter(follower => follower.id !== id);

            userThatFollows.following = userThatFollows.following.filter(following => following.id !== postid);

            console.log('unfollowed')
            await userThatFollows.save();
            await creatorUser.save();
        } else {
            throw new Error('error');
        }

        return new Response('Success', {status: 201})
    } catch (error) {
        return new Response('Failed!', {status: 500})
    }
};
