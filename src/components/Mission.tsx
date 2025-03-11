
import AnimatedSection from "./AnimatedSection";

const Mission = () => {
  const values = [
    {
      title: "Faith",
      description: "We are guided by our faith in action, working to serve others with compassion and dignity."
    },
    {
      title: "Service",
      description: "Through dedicated service, we empower communities to build sustainable futures for themselves."
    },
    {
      title: "Community",
      description: "We believe in the power of community to create meaningful, lasting change around the world."
    }
  ];

  return (
    <section id="mission" className="py-12 md:py-20 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-secondary rounded-full">
            Our Mission
          </span>
          <h2 className="section-title">Empowering Lives Through Compassion</h2>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <AnimatedSection delay={100}>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80" 
                  alt="Volunteers working in community" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary rounded-2xl -z-10"></div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <p className="text-lg mb-6 text-balance">
              Live Message is dedicated to transforming lives through compassionate service, sustainable development, and spiritual growth. We work alongside local communities to address immediate needs while building lasting solutions.
            </p>
            <p className="text-lg mb-8 text-balance">
              For over 10 years, our volunteers and partners have served in more than 20 countries, responding to crises, establishing educational programs, and providing healthcare to those in need.
            </p>
            <a href="#programs" className="button-primary">
              Explore Our Programs
            </a>
          </AnimatedSection>
        </div>
        
        {/* Values */}
        <div className="mt-24">
          <AnimatedSection>
            <h3 className="text-2xl md:text-3xl font-light text-center mb-16">Our Core Values</h3>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 200}>
                <div className="glass rounded-xl p-8 h-full">
                  <h4 className="text-xl font-medium mb-4">{value.title}</h4>
                  <p className="text-foreground/80">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
