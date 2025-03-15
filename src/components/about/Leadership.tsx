
import { User, Users, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Leadership = () => {
  const leaders = [
    {
      name: "Dr. Abebe Kebede",
      title: "Executive Director",
      bio: "With over 10 years of experience in nonprofit leadership, Dr. Abebe brings vision and strategic direction to Live Message.",
      image:
        "https://images.unsplash.com/photo-1542296153-d2d387514d97?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXRoaW9waWFuJTIwbWFufGVufDB8fDB8fHww",
    },
    {
      name: "Sarah Bekele",
      title: "Director of Global Operations",
      bio: "Sarah oversees our international programs across 20 countries, ensuring effective implementation and impact.",
      image:
        "https://images.unsplash.com/photo-1718203694879-766b434639f2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGV0aGlvcGlhbiUyMHdvbWFufGVufDB8fDB8fHww",
    },
    {
      name: "Kebede Abebe",
      title: "Chief Financial Officer",
      bio: "Kebede ensures strategic stewardship of resources and transparent financial management.",
      image:
        "https://images.unsplash.com/photo-1555908845-4dbd45b750de?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV0aGlvcGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Dr. Amare Bekele",
      title: "Director of Education",
      bio: "Dr. Amare leads our educational initiatives, developing curriculum and training programs worldwide.",
      image:
        "https://images.unsplash.com/photo-1705993235922-e09b232131a6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGV0aGlvcGlhbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const boardMembers = [
    "Thomas Genene, Board Chair",
    "Selam Tesfaye, Vice Chair",
    "Robel Kinfe, Treasurer",
    "Elisabeth Mekbib, Secretary",
    "Rev. Dawit Thompson",
    "Dr. Martha Gobeze",
    "Henok Nega, J.D."
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
