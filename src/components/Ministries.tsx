
import { BookOpen, Church, GraduationCap, Globe, Users } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Ministries = () => {
  const ministryList = [
    {
      icon: <Church className="h-10 w-10 text-primary" />,
      title: "Worship Ministry",
      description: "Cultivating authentic worship experiences that inspire hearts and transform lives."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Bible Studies",
      description: "Exploring God's Word through engaging, thoughtful studies for all ages and spiritual journeys."
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Christian Education",
      description: "Developing disciples through comprehensive biblical teaching and spiritual formation."
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global Missions",
      description: "Extending God's love across borders through strategic partnerships and mission trips."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Outreach",
      description: "Serving our local community through compassionate programs and relationship building."
    }
  ];

  return (
    <section id="ministries" className="py-20 md:py-32">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Our Ministries
          </span>
          <h2 className="section-title">How We Serve</h2>
          <p className="section-subtitle mx-auto text-center">
            Through various ministries, we aim to fulfill our mission and spread God's love both locally and globally.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {ministryList.map((ministry, index) => (
            <AnimatedSection key={ministry.title} delay={index * 100}>
              <div className="glass p-6 rounded-xl h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-4">{ministry.icon}</div>
                  <h3 className="text-xl font-medium mb-3">{ministry.title}</h3>
                  <p className="text-foreground/80 text-sm flex-1">{ministry.description}</p>
                  <div className="mt-4">
                    <a 
                      href="#" 
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ministries;
