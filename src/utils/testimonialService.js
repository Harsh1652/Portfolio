import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/testimonials';

export const getTestimonials = async () => {
  try {
    const res = await axios.get(API_BASE);
    // Ensure unique testimonials by mapping with the MongoDB _id
    return res.data.map(item => ({
      id: item._id, // Use MongoDB's _id as the unique identifier
      name: item.name,
      role: item.role,
      company: item.company,
      message: item.message,
      rating: item.rating,
      avatar: item.avatar
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const addTestimonial = async (testimonial) => {
  try {
    const res = await axios.post(API_BASE, testimonial);
    return res.data;
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
};
