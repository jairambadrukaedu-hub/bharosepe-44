import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ban, IndianRupee, Frown, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";

const Sellers = () => {
  const painPoints = [
    {
      icon: Ban,
      title: "Order Cancellations",
      description: "Buyers cancel orders after you've already started work or shipped products",
    },
    {
      icon: IndianRupee,
      title: "Payment Delays",
      description: "Buyers delay payment or claim they never received the product",
    },
    {
      icon: Frown,
      title: "No Commitment",
      description: "Buyers ghost you after agreeing to purchase, wasting your time",
    },
  ];

  const solutions = [
    {
      title: "Guaranteed Payment",
      description: "Money is in escrow before you start work - payment is guaranteed",
    },
    {
      title: "Buyer Commitment",
      description: "Buyers can't back out easily - funds are already deposited",
    },
    {
      title: "Faster Transactions",
      description: "Automatic release after delivery confirmation - no chasing payments",
    },
    {
      title: "Build Trust",
      description: "Show buyers you're serious and protected - increase conversions",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/20 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Sell with{" "}
              <span className="text-primary">
                Confidence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Get guaranteed payments and serious buyers who are committed to the transaction
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Seller Problems</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These are the challenges sellers face without escrow protection
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
                How Bharose Pe secured a freelancer's payment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Without Bharose Pe */}
              <Card className="p-6 shadow-soft border-2 border-destructive/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                    <Ban className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="font-bold text-lg">Without Bharose Pe</h3>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Problem:</strong> Priya, a freelance designer, agreed to create a logo for ₹8,000.
                  </p>
                  <p>
                    <strong className="text-foreground">What Happened:</strong> She completed 3 revisions. Client said "I'll pay next week" and disappeared.
                  </p>
                  <p>
                    <strong className="text-foreground">Result:</strong> 2 weeks of work, no payment, no recourse.
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
                    <strong className="text-foreground">Solution:</strong> Amit, another designer, used Bharose Pe. Client deposited ₹8,000 in escrow first.
                  </p>
                  <p>
                    <strong className="text-foreground">Protection:</strong> Amit knew payment was guaranteed. He delivered the logo confidently.
                  </p>
                  <p>
                    <strong className="text-foreground">Result:</strong> Client confirmed, payment released instantly. Amit got paid on time!
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Protect Sellers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bharose Pe ensures you get paid for your work, every time
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

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-soft">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-soft flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Increase Your Sales</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Buyers are more likely to purchase when they know their money is protected. By using Bharose Pe, you demonstrate professionalism and build trust instantly.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Show buyers you're a serious, professional seller</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Reduce cart abandonment and hesitation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>Build long-term customer relationships based on trust</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Getting Guaranteed Payments
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Never chase payments or deal with non-serious buyers again
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

export default Sellers;

