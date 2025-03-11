
import { useRef } from "react";
import { Droplet, Home, Heart, Utensils, BookOpen, Baby, Dog, Sprout, Speech } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const CompassionProjects = () => {
  const projects = [
    {
      icon: <Baby className="h-6 w-6 text-primary" />,
      title: "Children Ministry",
      description:
        "Providing clean water wells and sanitation education to communities lacking access to safe drinking water.",
      stat: "27",
      statLabel: "Wells Completed",
      image:
        "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNoaWxkcmVufGVufDB8fDB8fHww",
    },
    {
      icon: <Dog className="h-6 w-6 text-primary" />,
      title: "Veternary Services",
      description:
        "Building sustainable housing for families living in unsafe or inadequate shelter conditions.",
      stat: "142",
      statLabel: "Homes Built",
      image:
        "https://plus.unsplash.com/premium_photo-1661881918680-a3b2519f0298?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8",
    },
    {
      icon: <Sprout className="h-6 w-6 text-primary" />,
      title: "Agriculture and Health Advices",
      description:
        "Combating hunger through sustainable agriculture training, food distribution, and nutrition education.",
      stat: "1,200+",
      statLabel: "Families Supported",
      image:
        "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFncmljdWx0dXJlfGVufDB8fDB8fHww",
    },
    {
      icon: <Speech className="h-6 w-6 text-primary" />,
      title: "Testimony and Success Stories",
      description:
        "Supporting children's education through school construction, teacher training, and educational resources.",
      stat: "15",
      statLabel: "Schools Supported",
      image:
        "https://plus.unsplash.com/premium_photo-1661315600584-44560aeb8146?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVzdGltb255JTIwYW5kJTIwc3VjY2VzcyUyMHN0b3JpZXN8ZW58MHx8MHx8fDA%3D",
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
            Our compassion projects address critical needs while sharing God's love in tangible ways.
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
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-secondary rounded-lg p-3 text-center flex-1">
                      <div className="text-2xl font-bold text-primary">{project.stat}</div>
                      <div className="text-xs text-foreground/70">{project.statLabel}</div>
                    </div>
                    <Heart className="h-6 w-6 text-primary animate-pulse-soft" />
                  </div>
                  
                  <Button variant="outline" className="w-full mt-2">Support This Project</Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <AnimatedSection>
            <Button className="mx-auto">View All Projects</Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CompassionProjects;
