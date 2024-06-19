import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const POST = async(req, res) => {
    const { postid, id, image, username } = await req.json();

    try {
        await connectToDB();

        const creatorUser = await User.findById(postid); // Assuming postid is the creator's user ID
        const userThatFollows = await User.findById(id); // Assuming id is the user who is following

        if (!creatorUser || !userThatFollows) {
            throw new Error('User not found');
        }

        // Check if userThatFollows is already following creatorUser
        const isAlreadyFollowing = creatorUser.followers.some(follower => follower.id === id);
        if (!isAlreadyFollowing) {
            creatorUser.followers.push({
                id: id,
                image: image,
                username: username,
            });

            userThatFollows.following.push({
                id: postid,
                image: creatorUser.image,
                username: creatorUser.username,
            });

            await userThatFollows.save();
            await creatorUser.save();
        } else {
            throw new Error('Already following');
        }

        return new Response('Success', {status: 201})
    } catch (error) {
        return new Response('Failed!', {status: 500})
    }
};
