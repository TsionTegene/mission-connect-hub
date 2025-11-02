
import { useState } from "react";
import { HandHeart, Users, Mail, PencilLine, HeartHandshake, Hand, Cross } from "lucide-react";
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
      title: "Volunteer Opportunities",
      description:
        "Serve alongside us in various capacities based on your skills, availability, and passion.",
      action: "Join Our Team",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Partner with us",
      description:
        "Connect with others in a small group setting for fellowship, study, and growth.",
      action: "Join Our Team",
    },
    {
      icon: <Cross className="h-10 w-10 text-primary" />,
      title: "Pray with us",
      description:
        "Join our prayer team to lift up the needs of our mission fields and communities we serve.",
      action: "Subscribe",
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
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
    <div className="flex flex-col items-center text-center mb-6">
      <HeartHandshake className="h-12 w-12 text-primary mb-3" />
      <h2 className="text-3xl md:text-4xl font-bold">Support Our Work</h2>
    </div>
    <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
      Your generosity enables us to bring hope and assistance to communities around the world.
    </p>
  </AnimatedSection>

  <div className="grid md:grid-cols-3 gap-8 place-items-center">
    {/* Telebirr Section */}
    <AnimatedSection delay={100}>
      <div className="glass p-8 rounded-2xl text-center w-full max-w-md shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src="data:image/png;base64,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"
            alt="Telebirr Logo"
            className="w-24 h-auto mb-3"
          />
          <h3 className="text-2xl font-light text-primary">Telebirr Donation</h3>
        </div>

        <p className="text-lg font-medium text-foreground/80">
          📱 <span className="font-semibold">(+251) 990 208 851</span>
        </p>

        <p className="text-sm mt-4 text-foreground/60">
          Use the number above to send your donation via Telebirr.
        </p>
      </div>
    </AnimatedSection>

    {/* Bank Section */}
    <AnimatedSection delay={200}>
      <div className="glass p-8 rounded-2xl text-center w-full max-w-md shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src="data:image/jpeg;base64,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"
            alt="Commercial Bank of Ethiopia Logo"
            className="w-24 h-auto mb-3"
          />
          <h3 className="text-2xl font-light text-primary">Bank Account</h3>
        </div>

        <p className="text-lg font-medium text-foreground/80">
          🏦 Commercial Bank of Ethiopia<br />
          Account No: <span className="font-semibold">1000528447582</span>
        </p>

        <p className="text-sm mt-4 text-foreground/60">
          You can deposit or transfer directly to our bank account.
        </p>
      </div>
    </AnimatedSection>

    <AnimatedSection delay={200}>
      <div className="glass p-8 rounded-2xl text-center w-full max-w-md shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src="data:image/jpeg;base64,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IZKtfNvH8TfHx1HzxlnL8qvFf6a7pKVXSoxyL7IObuw3O61uUPebMZO+x9eCjJA9/TncOi54NK0+o9JpJkcic4/dDatuxMmxjMKpKq4T0MHLQD/5su3E78lcdnW+5qjbWPtb/wBG6KjsrLDnlfZAqWrWMrsoyYwWHM6CQN2FJWa9W/Ithljbn1k5Y5JK7UiWPJ2qvxElOR00bYy4dGAKEtfSx2WNhVVx5UkI+45iq5CLw1DLXjsiZhaXO2Nrp6jninkYsa5whqoRvYjkch6cQQSz1WthbzOHgLX0/Yigmc6RcH1eY57URpOrtc3HRsI+cM0Qoqd7VtuenjJ0xoqRYORiqMxF2OVrmCQaa5WLVb8KOgexc7fJwVoHKj2u9kWjYt4ON9eTHmz83R7Aum7DT1V6TNm2ceFU0RyTVUVqs3fwe2FgsSW7VyWD0WyNPKzS0arYrsrRVo37lbjk21WSK98ipjJ68KV5q1ewJ4ywulJG/PVc/UdmGd0axLnCIfemxvja7cns1y9aeXiSnPHGTExunO9lt0m1BHpcsT3Ycvg+bMT3W2OROEO67uqopKEbJMdLj542DbnMIAXfpcjIrbHvXhFNNlquiciFbw2Uv4zGtpnFzPcwn5m+VbNT02lftrYSwiIpD1bMteJI1jyqEl9a7nbkMtuP0a0R5hGe+1zpap6RWdHAu6R3GTd2prkrXycNQ989Tnbfr5GvGJmwjRiI3tc+j3oXVH1JXbVX2bbsLu42VqZwRLmStZSNtduJfCCfqI7LtpUq+nv7r7KOQ0yTyTJsSPBKuU5vWpBrC70x8x9lzUrsCNsK535eDbLC7czCeDrZBrpMXNGwczy3oAq9Qc1t1jneMndOirCqIcGxTsnhptcRO9bnG2/ZWht2v/jPd3fbgjXwyLT2onOSbdxDbuNgdE30bcDQWEdOqjKur/S3nq77o3Lhf4OiWokkLVbw5CVhrVmxV1ciLJYzykn933XDq9avDNmu7LXc/wAfsb6skj24kTCoTlEnSEAQBAEAQBAEAQBAbNeQNJhAnBn1HLCIgNe35919AyJHDysKiDkwTvr5WUwF5MlxJ6px6Hkw1xb26JwoT9zHufKA2J39R2nCeB5Ae7WljCDKhznHztMIg5MFxPfqs8ehyNnWgVgcg+FkAEjsgMiR3vr8LGEHILie52mETwZMBxBBBQwbc7vdMIDXmIBAWRyB40dfhByZ5jvYPX3TgcmCTvfVEwgBO1jGBz7MIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCA//9k="
            alt="Commercial Bank of Ethiopia Logo"
            className="w-24 h-auto mb-3"
          />
          <h3 className="text-2xl font-light text-primary">Bank Account</h3>
        </div>

        <p className="text-lg font-medium text-foreground/80">
          🏦 Berhan Bank<br />
          Account No: <span className="font-semibold">1600970076918</span>
        </p>

        <p className="text-sm mt-4 text-foreground/60">
          You can deposit or transfer directly to our bank account.
        </p>
      </div>
    </AnimatedSection>
  </div>

  <p className="text-xs text-center mt-12 text-foreground/60 max-w-lg mx-auto">
    Thank you for your generous support — together, we’re transforming lives through love and action.
  </p>
</div>
        
        {/* Join our team callout */}
        <div className="mt-16 glass-dark rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <AnimatedSection>
              <h3 className="text-2xl md:text-3xl font-medium mb-4">Get in Touch</h3>
              <p className="text-foreground/80 mb-6">
                We’re here to answer your questions and connect you with our team.
              </p>
              <a className="button-primary" href="https://web.telegram.org/k/#6739991618">Chat on Telegram</a>
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
