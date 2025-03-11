
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

const Donate = () => {
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

  return (
    <section id="donate" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-secondary/50 to-transparent"></div>
      
      {/* Content */}
      <div className="section-container relative z-10">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-secondary rounded-full">
            Support Our Work
          </span>
          <h2 className="section-title">Make a Difference Today</h2>
          <p className="section-subtitle mx-auto text-center">
            Your generosity enables us to bring hope and assistance to communities around the world.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 gap-12 mt-16">
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
    </section>
  );
};

export default Donate;
