import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

export default async function handler(req, res) {
  const client = new MongoClient(uri, options);
  
  try {
    await client.connect();
    const database = client.db("your_db_name");
    const collection = database.collection("testimonials");
    
    if (req.method === 'GET') {
      const testimonials = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return res.status(200).json(testimonials);
    }
    
    if (req.method === 'POST') {
      const testimonial = req.body;
      testimonial.createdAt = new Date();
      const result = await collection.insertOne(testimonial);
      return res.status(201).json({
        _id: result.insertedId,
        ...testimonial
      });
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
}