import { connectToDB } from "@/utils/database"
import User from "@/models/user"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { currentUserID } = req.query;

    // Connect to MongoDB
    await connectToDB()

    try {
      const userData = await db.collection('users').findOne({ id: currentUserID });
      res.status(200).json(userData);
    } catch (error) {
      console.error('Error finding user data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
