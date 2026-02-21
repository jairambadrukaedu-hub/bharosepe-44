import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShieldAlert, XCircle, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const Buyers = () => {
  const painPoints = [
    {
      icon: ShieldAlert,
      title: "Risk of Fraud",
      description: "Sellers may disappear after receiving payment without delivering products",
    },
    {
      icon: XCircle,
      title: "Late or No Delivery",
      description: "Products arrive late or never arrive, with no way to get your money back",
    },
    {
      icon: AlertTriangle,
      title: "No Recourse",
      description: "Once payment is sent, you have no leverage if something goes wrong",
    },
  ];

  const solutions = [
    {
      title: "Payment Protection",
      description: "Your money stays in escrow until you confirm delivery",
    },
    {
      title: "Quality Assurance",
      description: "Only release payment after verifying the product/service",
    },
    {
      title: "Dispute Resolution",
      description: "AI-powered mediation resolves issues quickly and fairly",
    },
    {
      title: "Full Transparency",
      description: "Track every step of your transaction in real-time",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/20 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Shop Without{" "}
              <span className="text-primary">
                Worries
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your money is protected until you're completely satisfied with your purchase
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground rounded-full shadow-soft hover:shadow-glow transition-smooth px-8"
            >
              Join Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Buyer Problems</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These are the risks you face when buying online without escrow protection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((pain, index) => (
              <Card
                key={pain.title}
                className="p-6 text-center shadow-soft animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                  <pain.icon className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{pain.title}</h3>
                <p className="text-muted-foreground">{pain.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Story</h2>
              <p className="text-lg text-muted-foreground">
                How Bharose Pe protected a buyer from fraud
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Without Bharose Pe */}
              <Card className="p-6 shadow-soft border-2 border-destructive/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="font-bold text-lg">Without Bharose Pe</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Problem:</strong> Raj saw a trendy jacket on Instagram for ₹3,500. He paid directly to the seller.
                  </p>
                  <p>
                    <strong className="text-foreground">What Happened:</strong> After 2 weeks, no delivery. Seller stopped responding. Money lost.
                  </p>
                  <p>
                    <strong className="text-foreground">Result:</strong> ₹3,500 gone, no jacket, no recourse.
                  </p>
                </div>
              </Card>

              {/* With Bharose Pe */}
              <Card className="p-6 shadow-soft border-2 border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">With Bharose Pe</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Solution:</strong> Meera found a similar jacket. She used Bharose Pe and paid ₹3,500 to escrow.
                  </p>
                  <p>
                    <strong className="text-foreground">Protection:</strong> Seller knew payment was secure. After 5 days, Meera received the jacket.
                  </p>
                  <p>
                    <strong className="text-foreground">Result:</strong> Confirmed delivery, released payment. Both happy!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Protect Buyers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bharose Pe gives you complete control and protection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center shadow-soft">
                  <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{solution.title}</h3>
                <p className="text-sm text-muted-foreground">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Shopping with Confidence
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Never worry about losing money to fraud or non-delivery again
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground rounded-full shadow-soft hover:shadow-glow transition-smooth px-8"
          >
            Join Early Access
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Buyers;

