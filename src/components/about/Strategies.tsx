
import { Target, Route, PlaySquare, Group, PersonStanding, Heart } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Strategies = () => {
  const strategies = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Spirit-Empowered Leadership",
      description: "Equipping and multiplying indigenous leaders through prayer, training, and mentorship to boldly advance the Gospel."
    },
    {
      icon: <PersonStanding className="h-10 w-10 text-primary" />,
      title: "Contextual Community Building",
      description: "Creating faith-filled communities that engage cultures respectfully through outreach, fostering growth and mission."
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Holistic Gospel Engagement",
      description: "Meeting spiritual, physical, and social needs to demonstrate Christ’s love and make disciples sustainably."
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
           Our approach to mission is empowering leaders, engaging cultures, and addressing holistic needs to effectively advance the Gospel.
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
            <h3 className="text-2xl font-light text-center mb-6">
              Our Strategic Process
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">
                  1
                </span>
                <h4 className="font-medium mb-2">Discover</h4>
                <p className="text-sm text-foreground/80">
                  Identifying unreached communities and building contextual relationships.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">
                  2
                </span>
                <h4 className="font-medium mb-2">Equip</h4>
                <p className="text-sm text-foreground/80">
                  Training and empowering indigenous leaders to multiply disciples.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">
                  3
                </span>
                <h4 className="font-medium mb-2">Engage</h4>
                <p className="text-sm text-foreground/80">
                  Addressing spiritual and practical needs through holistic outreach.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-primary text-white font-medium mb-3 flex items-center justify-center">
                  4
                </span>
                <h4 className="font-medium mb-2">Sustain</h4>
                <p className="text-sm text-foreground/80">
                  Nurturing communities for lasting growth and impact.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Strategies;
