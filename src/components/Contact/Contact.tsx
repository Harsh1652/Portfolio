import { useState, useRef } from "react";
import SectionTitle from "../UI/SectionTitle";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { useToast } from "@/components/UI/use-toast";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const contactInfo = [
    {
      icon: <Mail className="text-highlight-blue" size={24} />,
      label: "Email",
      value: "harsh160502@gmail.com",
      link: "mailto:harsh160502@gmail.com"
    },
    {
      icon: <Phone className="text-highlight-teal" size={24} />,
      label: "Phone",
      value: "+91 9982346893",
      link: "tel:+919982346893"
    },
    {
      icon: <Github className="text-white" size={24} />,
      label: "GitHub",
      value: "Harsh1652",
      link: "https://github.com/Harsh1652"
    },
    {
      icon: <Linkedin className="text-highlight-blue" size={24} />,
      label: "LinkedIn",
      value: "harsh-gupta16",
      link: "https://linkedin.com/in/harsh-gupta16"
    }
  ];
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission to Google Apps Script
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("subject", formData.subject);
      formPayload.append("message", formData.message);
      formPayload.append("timestamp", new Date().toISOString());
      
      // Send form data to Google Apps Script endpoint
      const response = await fetch("https://script.google.com/macros/s/AKfycbzIyALY5IW4Ov8JRnaopmKVxHXWTh98ZjpAFtu9cEF3UpUDmzphF7P4kQRFMl2MeHwS/exec", {
        method: "POST",
        body: formPayload,
        mode: "no-cors", // Required for cross-origin requests to Google Apps Script
      });
      
      // Reset form after submission
      if (formRef.current) {
        formRef.current.reset();
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      }
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
    } catch (error) {
      console.error("Error sending form data:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <SectionTitle 
          subtitle="Get in touch"
          title="Let's Work Together"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass-card p-6 opacity-0 animate-fade-in">
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Your Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    required 
                    className="bg-dark-200 border-gray-700"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+91 1234556789" 
                    required 
                    className="bg-dark-200 border-gray-700"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="bg-dark-200 border-gray-700"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="Project Inquiry" 
                  required 
                  className="bg-dark-200 border-gray-700"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Hi Harsh, I'd like to discuss a project..." 
                  required 
                  rows={6}
                  className="bg-dark-200 border-gray-700 resize-none"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-highlight-blue to-highlight-teal hover:opacity-90"
              >
                {isSubmitting ? "Sending..." : "Send Message"} {!isSubmitting && <Send size={16} className="ml-2" />}
              </Button>
            </form>
          </Card>
          
          {/* Contact Info */}
          <div className="space-y-8 opacity-0 animate-fade-in animate-delay-200">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-6">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  target={item.label !== "Email" && item.label !== "Phone" ? "_blank" : undefined}
                  rel={item.label !== "Email" && item.label !== "Phone" ? "noopener noreferrer" : undefined}
                  className="flex items-center p-4 glass-card rounded-lg hover-card transition-all"
                >
                  <div className="bg-dark-200 p-3 rounded-full mr-4">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="p-6 glass-card rounded-lg border border-highlight-teal/30">
              <h4 className="font-semibold text-highlight-teal mb-2">Response Time</h4>
              <p className="text-gray-300">
                I typically respond to messages within 24 hours. For urgent inquiries, please contact me directly via phone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;