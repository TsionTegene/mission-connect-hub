
import { useRef } from "react";
import { Droplet, Home, Heart, Utensils, BookOpen } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const CompassionProjects = () => {
  const projects = [
    {
      icon: <Droplet className="h-6 w-6 text-primary" />,
      title: "Clean Water Initiative",
      description: "Providing clean water wells and sanitation education to communities lacking access to safe drinking water.",
      stat: "27",
      statLabel: "Wells Completed",
      image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      title: "Housing Project",
      description: "Building sustainable housing for families living in unsafe or inadequate shelter conditions.",
      stat: "142",
      statLabel: "Homes Built",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Utensils className="h-6 w-6 text-primary" />,
      title: "Food Security Program",
      description: "Combating hunger through sustainable agriculture training, food distribution, and nutrition education.",
      stat: "1,200+",
      statLabel: "Families Supported",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Education Access",
      description: "Supporting children's education through school construction, teacher training, and educational resources.",
      stat: "15",
      statLabel: "Schools Supported",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
    }
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
    <section id="compassion-projects" className="py-20 md:py-32 bg-primary/5">
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
