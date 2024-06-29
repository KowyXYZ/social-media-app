import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import Post from "@/models/post";


export const PATCH = async(req, res) => {
    if (req.method !== 'PATCH') {
        return new Response('METHOD NOT ALLOWED!', {status: 405})
    }

    const { commentId, commentCreator, postCreator } = await req.json();

    try {
        await connectToDB();

        console.log( commentId + ' ' + commentCreator + ' ' + postCreator)

        return new Response('Success', {status: 201})
    } catch (error) {
        return new Response('Failed!', {status: 500})
    }
};
