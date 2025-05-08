import { useRef, useState, useEffect } from "react";
import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { useToast } from "@/components/UI/use-toast";
import { Star, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/UI/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
// Define the testimonial type based on your MongoDB schema
interface Testimonial {
  _id: string;
  name: string;
  company: string;
  role: string;
  message: string;
  rating: number;
  avatar?: string;
  createdAt: string;
}

const Testimonials = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Create embla carousel with autoplay plugin
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);
  
  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/testimonials`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        
        const data = await response.json();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Could not load testimonials. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formRef.current) return;
    
    try {
      const formData = new FormData(formRef.current);
      const testimonialData = {
        name: formData.get('name'),
        company: formData.get('company'),
        role: formData.get('role'),
        message: formData.get('message'),
        rating: rating,
        // Use a default avatar if none is provided
        avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(formData.get('name') as string)
      };
      
      const response = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit testimonial');
      }
      
      // Add the new testimonial to the list
      const savedTestimonial = await response.json();
      setTestimonials(prev => [savedTestimonial, ...prev]);
      
      // Reset form
      formRef.current.reset();
      setRating(5);
      setIsDialogOpen(false);
      
      toast({
        title: "Testimonial Submitted",
        description: "Thank you for your feedback! Your testimonial has been added.",
      });
    } catch (err) {
      console.error('Error submitting testimonial:', err);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="bg-dark-400/50">
      <div className="container">
        <SectionTitle 
          subtitle="What others say"
          title="Client Testimonials"
        />
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-highlight-teal" />
          </div>
        ) : error ? (
          <div className="text-center py-10 text-gray-400">
            <p>{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No testimonials yet. Be the first to add one!</p>
          </div>
        ) : (
          <div className="relative py-10">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial._id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                    <Card className="glass-card p-6 h-full">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}`} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{testimonial.name}</h3>
                          <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            size={16} 
                            className={`${testimonial.rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`}
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-gray-300 italic">
                        "{testimonial.message}"
                      </blockquote>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            <button className="absolute -left-4 top-1/2 -translate-y-1/2 bg-dark-300 border border-gray-700 text-white hover:bg-dark-200 rounded-full p-2">
              <ChevronLeft size={18} />
            </button>
            <button className="absolute -right-4 top-1/2 -translate-y-1/2 bg-dark-300 border border-gray-700 text-white hover:bg-dark-200 rounded-full p-2">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
        
        <div className="mt-12 text-center opacity-0 animate-fade-in animate-delay-300">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-highlight-blue to-highlight-teal hover:opacity-90">
                Add Your Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-dark-300 border-gray-700">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
              </DialogHeader>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="John Doe" 
                    required 
                    className="bg-dark-200 border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company Name
                  </label>
                  <Input 
                    id="company" 
                    name="company"
                    placeholder="ABC Corporation" 
                    required 
                    className="bg-dark-200 border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Your Role
                  </label>
                  <Input 
                    id="role" 
                    name="role"
                    placeholder="Lead Developer" 
                    required 
                    className="bg-dark-200 border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star 
                          size={24} 
                          className={`${rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Share your experience working with me..." 
                    required 
                    rows={5}
                    className="bg-dark-200 border-gray-700 resize-none"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-highlight-blue to-highlight-teal hover:opacity-90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : "Submit Testimonial"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
