import { Card } from "@/components/ui/card";
import { Target, Eye } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To make every online transaction in India safe, simple, and trustworthy through innovative escrow solutions.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "To become India's most trusted payment protection platform, enabling millions of buyers and sellers to trade with confidence.",
    },
  ];

  const team = [
    {
      name: "Rajesh Sharma",
      role: "Founder & CEO",
      description: "15+ years in fintech. Previously led payment solutions at major Indian banks.",
      avatar: "RS",
    },
    {
      name: "Priya Mehta",
      role: "Co-Founder & CTO",
      description: "Tech innovator with expertise in AI and blockchain. Former senior engineer at top tech companies.",
      avatar: "PM",
    },
    {
      name: "Amit Patel",
      role: "Head of Legal & Compliance",
      description: "RBI compliance expert with 10+ years ensuring regulatory adherence in fintech.",
      avatar: "AP",
    },
    {
      name: "Sneha Gupta",
      role: "Head of Customer Success",
      description: "Customer-first advocate ensuring every user has a seamless experience.",
      avatar: "SG",
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description: "Bharose Pe was born from a vision to solve India's trust deficit in online transactions",
    },
    {
      year: "2024",
      title: "Platform Launch",
      description: "Successfully launched escrow platform with PAN/KYC integration and RBI compliance",
    },
    {
      year: "2024",
      title: "AI Mediation",
      description: "Introduced AI-powered dispute resolution, cutting resolution time by 70%",
    },
    {
      year: "2025",
      title: "Scale & Growth",
      description: "Expanding to serve 100,000+ users and processing ₹100+ Cr in secure transactions",
    },
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/20 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About{" "}
              <span className="text-primary">
                Bharose Pe
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Building India's most trusted escrow platform, one transaction at a time
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="p-8 shadow-soft hover:shadow-glow transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mb-6 bg-primary rounded-2xl flex items-center justify-center shadow-soft">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals committed to building trust in digital transactions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={member.name}
                className="p-6 text-center shadow-soft hover:shadow-glow transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-soft">
                  {member.avatar}
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in building India's most trusted escrow platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="flex gap-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-soft">
                      {milestone.year}
                    </div>
                  </div>
                  <Card className="flex-1 p-6 shadow-soft">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

