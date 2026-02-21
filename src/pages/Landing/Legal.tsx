import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Lock, FileCheck, Scale, Bot, Shield, CheckCircle2 } from "lucide-react";

const Legal = () => {
  const compliance = [
    {
      icon: Lock,
      title: "PAN/KYC Mandatory",
      description: "Every user on Bharose Pe is verified with PAN and KYC. We ensure complete identity verification before any transaction can take place.",
    },
    {
      icon: FileCheck,
      title: "RBI Compliance",
      description: "We strictly follow all Reserve Bank of India (RBI) guidelines and regulations for payment intermediaries and escrow services.",
    },
    {
      icon: Scale,
      title: "Mediation Act",
      description: "Our dispute resolution process follows the Mediation Act 2023, ensuring fair and legally binding settlements.",
    },
    {
      icon: Bot,
      title: "AI-Powered Disputes",
      description: "Our AI mediation system analyzes evidence, conversation history, and agreement terms to suggest fair resolutions quickly.",
    },
  ];

  const faqs = [
    {
      question: "Is Bharose Pe legally compliant in India?",
      answer: "Yes, absolutely. We are fully compliant with RBI regulations, implement mandatory PAN/KYC verification, and follow the Mediation Act 2023 for dispute resolution. All transactions are legally protected.",
    },
    {
      question: "How does the KYC process work?",
      answer: "During signup, users must provide their PAN card details and complete KYC verification. This ensures every participant is a verified, real person, significantly reducing fraud risk.",
    },
    {
      question: "What happens if there's a dispute?",
      answer: "If either party raises a dispute, our AI mediation system reviews all evidence including chat history, agreement terms, and delivery proof. It suggests a fair resolution. If parties don't agree, human mediators step in as per the Mediation Act.",
    },
    {
      question: "How long is money held in escrow?",
      answer: "Money is held until the buyer confirms satisfaction with the delivery or service. If there's no response from the buyer within the agreed timeline (usually 7-14 days), funds are automatically released to the seller.",
    },
    {
      question: "Are there any fees?",
      answer: "Yes, Bharose Pe charges a small service fee (typically 2-3% of transaction value) that is split between buyer and seller. This covers our escrow, mediation, and compliance costs.",
    },
    {
      question: "Is my money safe in escrow?",
      answer: "Absolutely. Escrow funds are held in a secure, RBI-compliant account separate from our operational funds. Your money is protected and only released according to agreed terms.",
    },
    {
      question: "Can sellers trust they'll get paid?",
      answer: "Yes. Once funds are in escrow, sellers know the payment is guaranteed. They can confidently complete the work or delivery knowing the money is secured.",
    },
    {
      question: "What if the buyer never confirms delivery?",
      answer: "The agreement includes an auto-release timeline. If the buyer doesn't respond within the specified period (and there's no dispute), funds are automatically released to the seller.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Legal &{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Trust
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Built on a foundation of compliance, security, and transparency
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Compliance Framework</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow the highest standards of regulatory compliance and security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {compliance.map((item, index) => (
              <Card
                key={item.title}
                className="p-6 shadow-soft hover:shadow-glow transition-smooth animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow flex-shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-soft">
              <h2 className="text-3xl font-bold mb-8 text-center">Security Measures</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Bank-Grade Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      All data and transactions use 256-bit SSL encryption
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Separate Escrow Accounts</h4>
                    <p className="text-sm text-muted-foreground">
                      Funds held separately from operational accounts
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Regular Audits</h4>
                    <p className="text-sm text-muted-foreground">
                      Third-party security and financial audits
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time fraud detection and prevention
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Data Privacy</h4>
                    <p className="text-sm text-muted-foreground">
                      GDPR compliant data handling and storage
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Optional 2FA for enhanced account security
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about legal protection and compliance
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-lg px-6 shadow-soft"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;

