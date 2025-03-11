
import AnimatedSection from "@/components/AnimatedSection";

const AboutHero = () => {
  return (
    <section id="about-hero" className="pt-32 pb-12 md:pt-40 md:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 z-0"></div>
      <div className="section-container relative z-10">
        <AnimatedSection>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">About Us</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Learn about our history, values, and the people who make Grace Mission possible.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AboutHero;
