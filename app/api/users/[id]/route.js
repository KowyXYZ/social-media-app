
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async(req, {params}) => {
    try {
        await connectToDB();

        const userId = params.id; // Assuming id is passed correctly in the params
        const singleUser = await User.findById(userId)
        console.log(userId)
        console.log(singleUser.email)

        if (!singleUser) {
            return new Response('User not found', {status: 404});
        }

        return new Response(JSON.stringify(singleUser), {status: 200});
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return new Response("Failed to Fetch user", {status: 500});
    }
};
