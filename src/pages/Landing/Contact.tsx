import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnimatedBackground from "@/components/Landing/AnimatedBackground";
import ScrollReveal from "@/components/Landing/ScrollReveal";
import { Mail, Phone, MapPin, MessageCircle, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@bharosepe.com",
      description: "For general inquiries and support",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 98765 43210",
      description: "Mon-Fri, 9am-6pm IST",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+91 98765 43210",
      description: "Quick support on WhatsApp",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Mumbai, Maharashtra",
      description: "India - 400001",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Get in{" "}
              <span className="text-primary">
                Touch
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Have questions? We're here to help. Reach out to us anytime!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {contactMethods.map((method, index) => (
              <ScrollReveal key={method.title} delay={index * 0.1} direction="scale">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 text-center glass-card hover:shadow-glow transition-smooth h-full">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center shadow-soft"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="h-7 w-7 text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-sm font-medium text-primary mb-1">{method.value}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <ScrollReveal direction="scale" delay={0.3}>
              <Card className="p-8 md:p-12 glass-card shadow-depth">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-3">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll respond within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label 
                      htmlFor="name"
                      className={`transition-smooth ${focusedField === "name" ? "text-primary" : ""}`}
                    >
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your full name"
                        required
                        className="glass transition-smooth"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === "name" ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label 
                      htmlFor="email"
                      className={`transition-smooth ${focusedField === "email" ? "text-primary" : ""}`}
                    >
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your.email@example.com"
                        required
                        className="glass transition-smooth"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === "email" ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label 
                      htmlFor="phone"
                      className={`transition-smooth ${focusedField === "phone" ? "text-primary" : ""}`}
                    >
                      Phone Number (Optional)
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="+91 98765 43210"
                        className="glass transition-smooth"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === "phone" ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label 
                      htmlFor="message"
                      className={`transition-smooth ${focusedField === "message" ? "text-primary" : ""}`}
                    >
                      Message
                    </Label>
                    <div className="relative mt-2">
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us how we can help you..."
                        required
                        className="glass transition-smooth min-h-[150px]"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: focusedField === "message" ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground rounded-full shadow-soft hover:shadow-glow transition-smooth relative overflow-hidden group"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Sending...
                          </motion.span>
                        ) : (
                          <motion.span
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            Send Message
                            <Send className="h-5 w-5" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      
                      <motion.span
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Chatbot Placeholder */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />
        <AnimatedBackground />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="scale" delay={0.2}>
              <Card className="p-8 md:p-12 glass-card hover:shadow-glow transition-smooth">
                <motion.div 
                  className="w-20 h-20 mx-auto mb-6 bg-primary rounded-3xl flex items-center justify-center shadow-soft"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <MessageCircle className="h-10 w-10 text-primary-foreground" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Need Instant Help?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our AI-powered chatbot can answer common questions instantly. Available 24/7 to assist you!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full hover-lift"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat with Us Now
                  </Button>
                </motion.div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

