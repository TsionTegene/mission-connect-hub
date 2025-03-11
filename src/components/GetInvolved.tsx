
import { HandHeart, Users, Mail, PencilLine } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";

const GetInvolved = () => {
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
    <section id="get-involved" className="py-20 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Participate
          </span>
          <h2 className="section-title">Get Involved</h2>
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
