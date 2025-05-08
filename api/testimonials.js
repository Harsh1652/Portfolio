import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // Improved error logging
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI environment variable not found");
    return res.status(500).json({ error: "MongoDB connection string not found" });
  }
  
  // Add connection options for better reliability
  const client = new MongoClient(process.env.MONGO_URI, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000
  });
  
  try {
    await client.connect();
    const database = client.db("portfolio");
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
    console.error("MongoDB error:", error);
    return res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
}