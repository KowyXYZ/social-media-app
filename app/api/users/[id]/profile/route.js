// import { connectToDB } from "@/utils/database"
// import User from "@/models/user"

// export const GET = async(req, {params}) => {
//     try {
//         await connectToDB()

//         const singleUser = await User.findOne({ username: params.username })
//         if(!singleUser) return  new Response('singleUser not Found', {status: 404})
//         return new Response(JSON.stringify(singleUser), {status: 200})
//     } catch (error) {
//         return new Response("Failed to Fetch singleUser", {status: 500})
//     }
// }
