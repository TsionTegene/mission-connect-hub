
import { useState } from "react";
import { HandHeart, Users, Mail, PencilLine, HeartHandshake } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const GetInvolved = () => {
  const [donationAmount, setDonationAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  
  const predefinedAmounts = [25, 50, 100, 250];
  
  const handlePredefinedAmount = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount("");
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setDonationAmount(value ? parseInt(value) : null);
    }
  };

  const involvementOptions = [
    {
      icon: <HandHeart className="h-10 w-10 text-primary" />,
      title: "Volunteer",
      description: "Serve alongside us in various capacities based on your skills, availability, and passion.",
      action: "Join Our Team"
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Small Groups",
      description: "Connect with others in a small group setting for fellowship, study, and growth.",
      action: "Find a Group"
    },
    {
      icon: <Mail className="h-10 w-10 text-primary" />,
      title: "Stay Updated",
      description: "Sign up for our newsletter to receive mission updates, prayer requests, and event information.",
      action: "Subscribe"
    },
    {
      icon: <PencilLine className="h-10 w-10 text-primary" />,
      title: "Prayer Support",
      description: "Join our prayer team to lift up the needs of our mission fields and communities we serve.",
      action: "Commit to Pray"
    }
  ];

  return (
    <section id="get-involved" className="py-12 md:py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-secondary/50 to-transparent"></div>
      
      <div className="section-container relative z-10">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Participate
          </span>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-4">Get Involved & Support Our Mission</h2>
          <p className="section-subtitle mx-auto text-center">
            There are many ways to be part of our mission. Find your place in making a difference.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {involvementOptions.map((option, index) => (
            <AnimatedSection key={option.title} delay={index * 100}>
              <div className="glass p-6 rounded-xl h-full">
                <div className="flex flex-col h-full items-center text-center">
                  <div className="mb-4">{option.icon}</div>
                  <h3 className="text-xl font-medium mb-3">{option.title}</h3>
                  <p className="text-foreground/80 text-sm flex-1 mb-6">{option.description}</p>
                  <Button variant="outline" className="mt-auto">
                    {option.action}
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        {/* Donate Section */}
        <div className="mt-24">
          <AnimatedSection>
            <div className="flex items-center justify-center mb-6">
              <HeartHandshake className="h-12 w-12 text-primary mr-4" />
              <h2 className="text-3xl md:text-4xl font-bold">Support Our Work</h2>
            </div>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Your generosity enables us to bring hope and assistance to communities around the world.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection delay={100}>
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-light mb-8">Donate Now</h3>
                
                {/* Donation amount selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3">Select Donation Amount</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        className={cn(
                          "py-3 rounded-lg transition-all duration-200",
                          donationAmount === amount
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/80 hover:bg-secondary"
                        )}
                        onClick={() => handlePredefinedAmount(amount)}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom amount input */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">$</span>
                    <input
                      type="text"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full pl-8 py-3 px-4 bg-secondary/60 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                    />
                  </div>
                </div>
                
                {/* Donation frequency */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3">Donation Frequency</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" className="bg-primary text-primary-foreground py-3 rounded-lg">
                      One-time
                    </button>
                    <button type="button" className="bg-secondary/80 hover:bg-secondary py-3 rounded-lg transition-all duration-200">
                      Monthly
                    </button>
                  </div>
                </div>
                
                {/* Donation button */}
                <button 
                  type="button" 
                  className="w-full button-primary py-4 text-base"
                >
                  Donate ${donationAmount || 0}
                </button>
                
                <p className="text-xs text-center mt-4 text-foreground/60">
                  Your donation is tax-deductible to the extent allowed by law.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <h3 className="text-2xl font-light mb-6">Your Impact</h3>
              <p className="mb-6">
                Every contribution makes a real difference in the lives of those we serve. Here's how your donation can help:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">$25</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Provides clean water</h4>
                    <p className="text-sm text-foreground/80">
                      Supplies a family with clean water for a month through our filtration program.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">$50</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Supports education</h4>
                    <p className="text-sm text-foreground/80">
                      Provides school supplies and educational resources for a student for a full semester.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">$100</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Funds medical care</h4>
                    <p className="text-sm text-foreground/80">
                      Provides basic medical supplies and care for families in underserved communities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">$250</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Empowers entrepreneurs</h4>
                    <p className="text-sm text-foreground/80">
                      Helps a local entrepreneur start or expand their business through microloans and training.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <a href="#" className="text-primary hover:underline">Learn more about our financials and accountability</a>
              </div>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Join our team callout */}
        <div className="mt-16 glass-dark rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <AnimatedSection>
              <h3 className="text-2xl md:text-3xl font-medium mb-4">Ready to Make an Impact?</h3>
              <p className="text-foreground/80 mb-6">
                We're always looking for compassionate individuals who want to use their gifts and talents to serve others. Whether you have a little time or a lot, there's a place for you in our mission.
              </p>
              <Button className="w-full md:w-auto">Contact Our Team</Button>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
                alt="Team meeting" 
                className="rounded-lg shadow-lg h-full w-full object-cover max-h-[300px]"
              />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
