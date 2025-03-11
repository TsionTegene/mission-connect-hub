
import { User, Users, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Leadership = () => {
  const leaders = [
    {
      name: "Dr. James Wilson",
      title: "Executive Director",
      bio: "With over 20 years of experience in nonprofit leadership, Dr. Wilson brings vision and strategic direction to Grace Mission.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Sarah Chen",
      title: "Director of Global Operations",
      bio: "Sarah oversees our international programs across 40 countries, ensuring effective implementation and impact.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Michael Rodriguez",
      title: "Chief Financial Officer",
      bio: "Michael ensures strategic stewardship of resources and transparent financial management.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Dr. Amara Johnson",
      title: "Director of Education",
      bio: "Dr. Johnson leads our educational initiatives, developing curriculum and training programs worldwide.",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const boardMembers = [
    "Thomas Greene, Board Chair",
    "Linda Patel, Vice Chair",
    "Robert Kim, Treasurer",
    "Elizabeth Mbeki, Secretary",
    "Rev. David Thompson",
    "Dr. Maria Gonzalez",
    "William Chen, J.D."
  ];

  return (
    <section id="leadership" className="py-12 md:py-20 bg-secondary/30">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Our Team
          </span>
          <h2 className="section-title">Leadership & Board</h2>
          <p className="section-subtitle mx-auto text-center">
            Meet the dedicated individuals who guide our mission with wisdom and compassion.
          </p>
        </AnimatedSection>

        <div className="mt-12">
          <AnimatedSection>
            <h3 className="text-2xl font-light mb-8 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Leadership Team
            </h3>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-lg font-medium">{leader.name}</h4>
                    <p className="text-primary/80 text-sm mb-3">{leader.title}</p>
                    <p className="text-foreground/70 text-sm flex-1">{leader.bio}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <AnimatedSection>
            <h3 className="text-2xl font-light mb-8 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2" />
              Board of Directors
            </h3>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="glass p-8 rounded-xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-4">
                {boardMembers.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <User className="h-5 w-5 text-primary mr-2" />
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Leadership;
