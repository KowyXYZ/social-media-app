import { connectToDB } from "@/utils/database";
import User from "@/models/user";

// REMOVE THEM FROM FOLLOWERS LIST AND YOU FROM THEIR FOLLOWING

export const PATCH = async(req, res) => {
    if (req.method !== 'PATCH') {
        return new Response('METHOD NOT ALLOWED!', {status: 405})
    }

    const { followingUser, id} = await req.json();

    try {
        await connectToDB();

        const userThatIsFollowing = await User.findById(followingUser); //  -HIM
        const userThatRemoves = await User.findById(id); // -YOU

        if (!userThatRemoves || !userThatIsFollowing) {
            throw new Error('User not found');
        }

        try {
            userThatRemoves.following = userThatRemoves.following.filter((user, index) => user.id !== followingUser)
            userThatIsFollowing.followers = userThatRemoves.followers.filter((user, index) => user.id !== id)

            console.log('unfollowed')
            await userThatIsFollowing.save();
            await userThatRemoves.save();
        } catch (error) {
            console.log(error)
        }

       
        return new Response('Success', {status: 201})
    } catch (error) {
        return new Response('Failed!', {status: 500})
    }
};
