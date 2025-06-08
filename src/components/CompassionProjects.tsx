
import { useRef } from "react";
import { Droplet, Home, Heart, Utensils, BookOpen, Baby, Dog, Sprout, Speech, HelpingHand } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const CompassionProjects = () => {
  const projects = [
    {
      icon: <Baby className="h-6 w-6 text-primary" />,
      title: "Children's Ministry",
      description:
        "We nurture the next generation through discipleship, education, and relational care planting seeds of faith and hope in the hearts of children and their families.",
      stat: "",
      statLabel: "",
      image:
        "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNoaWxkcmVufGVufDB8fDB8fHww",
    },
    {
      icon: <Dog className="h-6 w-6 text-primary" />,
      title: "Veternary Care Outreach",
      description:
        "Through mobile veterinary services, we care for the livestock of vulnerable communities strengthening livelihoods and opening hearts to the Gospel through practical compassion.",
      stat: "",
      statLabel: "",
      image:
        "https://plus.unsplash.com/premium_photo-1661881918680-a3b2519f0298?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
    },
    {
      icon: <Sprout className="h-6 w-6 text-primary" />,
      title: "Community Advisory Services",
      description:
        "We offer trusted advice and training on health, agriculture, environmental stewardship, and animal care empowering families to thrive with sustainable, Christ-honoring practices.",
      stat: "",
      statLabel: "",
      image:
        "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFncmljdWx0dXJlfGVufDB8fDB8fHww",
    },
    {
      icon: <HelpingHand className="h-6 w-6 text-primary" />,
      title: "Gospel & Basic Needs Support",
      description:
        "We distribute Bibles to new churches and ministry teams, and provide clothing and essential items to individuals and families in need demonstrating Christ’s love in both word and deed.",
      stat: "15",
      statLabel: "Schools Supported",
      image:
        "https://plus.unsplash.com/premium_photo-1725408144734-fd60f47ccc72?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29zcGVsfGVufDB8fDB8fHww",
    },
  ];
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    
    const cards = container.querySelectorAll('.project-card');
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const cardRect = cardElement.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;
      
      const maxDistance = 300; // Maximum distance to apply effect
      const distX = mouseX - cardCenterX;
      const distY = mouseY - cardCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const scale = 1 + (0.05 * strength);
        cardElement.style.transform = `scale(${scale})`;
        cardElement.style.zIndex = "10";
      } else {
        cardElement.style.transform = `scale(1)`;
        cardElement.style.zIndex = "1";
      }
    });
  };
  
  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const cards = container.querySelectorAll('.project-card');
    cards.forEach((card) => {
      (card as HTMLElement).style.transform = `scale(1)`;
      (card as HTMLElement).style.zIndex = "1";
    });
  };

  return (
    <section id="compassion-projects" className="py-12 md:py-20 bg-primary/5">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Making a Difference
          </span>
          <h2 className="section-title">Compassion Projects</h2>
          <p className="section-subtitle mx-auto text-center">
           Driven by Christ’s love, our Compassion Ministries meet spiritual and practical needs to uplift lives and share the Gospel.
          </p>
        </AnimatedSection>
        
        <div 
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {projects.map((project, index) => (
            <AnimatedSection key={project.title} delay={index * 100}>
              <div className={cn(
                "project-card glass rounded-xl overflow-hidden h-full transition-all duration-300",
              )}>
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 z-10 flex items-center justify-center">
                    <div className="glass-dark rounded-full p-4">
                      {project.icon}
                    </div>
                  </div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                  <p className="text-foreground/80 text-sm mb-4">{project.description}</p>  
                  
                  <Button variant="outline" className="w-full mt-2">Support This Project</Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompassionProjects;
