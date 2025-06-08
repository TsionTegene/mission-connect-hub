
import { BookOpen, Church, GraduationCap, Globe, Users, Phone, Cross } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const Ministries = () => {
  const ministryList = [
    {
      icon: <Church className="h-10 w-10 text-primary" />,
      title: "Church planting and Evangelism",
      description: "Establishing gospel-centered churches and reaching unreached communities through intentional evangelism and disciple-making."
    },
    {
      icon: <Cross className="h-10 w-10 text-primary" />,
      title: "Crusade of Events",
      description: "Proclaiming Christ boldly through large-scale gatherings, healing crusades, and strategic gospel events that ignite transformation."
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Training and school",
      description: "Equipping believers, leaders, and missionaries with sound biblical teaching and practical tools to fulfill the Great Commission."
    },
    {
      icon: <Phone className="h-10 w-10 text-primary" />,
      title: "Media and Communications",
      description: "Using media to share the Gospel, tell mission stories, and mobilize the Church through impactful digital and print platforms."
    }
  ];

  return (
    <section id="ministries" className="py-12 md:py-20">
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
