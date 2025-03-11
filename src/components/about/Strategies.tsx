
import { Target, Route, PuzzlePiece } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Strategies = () => {
  const strategies = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Needs-Based Approach",
      description: "We identify and address the most pressing needs in communities through thorough research and local partnerships."
    },
    {
      icon: <Route className="h-10 w-10 text-primary" />,
      title: "Sustainable Development",
      description: "We create programs designed for long-term impact, focusing on building capacity rather than dependency."
    },
    {
      icon: <PuzzlePiece className="h-10 w-10 text-primary" />,
      title: "Holistic Care",
      description: "We address physical, emotional, educational, and spiritual needs through integrated programming."
    }
  ];

  return (
    <section id="strategies" className="py-12 md:py-20">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            How We Work
          </span>
          <h2 className="section-title">Ministry Strategies</h2>
          <p className="section-subtitle mx-auto text-center">
            Our approach to mission work is thoughtful, strategic, and focused on creating sustainable impact.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {strategies.map((strategy, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="glass p-8 rounded-xl h-full flex flex-col items-center text-center">
                <div className="mb-6">{strategy.icon}</div>
                <h3 className="text-xl font-medium mb-4">{strategy.title}</h3>
                <p className="text-foreground/80">{strategy.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300} className="mt-16">
          <div className="glass-dark p-8 rounded-xl">
            <h3 className="text-2xl font-light text-center mb-6">Our Strategic Process</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">1</span>
                <h4 className="font-medium mb-2">Listen</h4>
                <p className="text-sm text-white/80">Understand community needs through dialogue and research</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">2</span>
                <h4 className="font-medium mb-2">Collaborate</h4>
                <p className="text-sm text-white/80">Partner with local leaders and organizations</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">3</span>
                <h4 className="font-medium mb-2">Implement</h4>
                <p className="text-sm text-white/80">Execute programs with local involvement</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">4</span>
                <h4 className="font-medium mb-2">Empower</h4>
                <p className="text-sm text-white/80">Transfer ownership to community leaders</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Strategies;
