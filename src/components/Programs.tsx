import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { cn } from "@/lib/utils";

const Programs = () => {
  const programs = [
    {
      title: "Community Development",
      description:
        "Empowering communities through sustainable infrastructure projects, local leadership training, and economic opportunity initiatives.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Education Support",
      description:
        "Providing access to quality education through school construction, teacher training, scholarship programs, and educational resources.",
      image:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Health & Wellness",
      description:
        "Improving community health through medical missions, preventative care education, clean water initiatives, and nutrition programs.",
      image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".program-card");
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    cards.forEach((card) => {
      const cardRect = (card as HTMLElement).getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const maxRotation = 4;
      const distX = mouseX - cardCenterX;
      const distY = mouseY - cardCenterY;

      // Calculate distance between mouse and card center
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDistance =
        Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;

      // Calculate rotation based on distance (closer = more effect)
      const rotationFactor = 1 - Math.min(0.8, distance / maxDistance);

      // Apply rotation
      const rotateY = (distX / cardRect.width) * maxRotation * rotationFactor;
      const rotateX = -(distY / cardRect.height) * maxRotation * rotationFactor;

      (
        card as HTMLElement
      ).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".program-card");
    cards.forEach((card) => {
      (card as HTMLElement).style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  };

  return (
    <section id="programs" className="py-12 md:py-20 bg-secondary/50">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Our Work
          </span>
          <h2 className="section-title">Transformative Programs</h2>
          <p className="section-subtitle mx-auto text-center">
            Through our strategic programs, we address critical needs while
            building capacity for long-term change.
          </p>
        </AnimatedSection>

        <div
          ref={containerRef}
          className="grid md:grid-cols-3 gap-8 mt-16 perspective"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {programs.map((program, index) => (
            <AnimatedSection key={program.title} delay={index * 150}>
              <div
                className={cn(
                  "program-card h-full transition-all duration-200 ease-out preserve-3d"
                )}
              >
                <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-medium mb-3">
                      {program.title}
                    </h3>
                    <p className="text-foreground/80 text-sm flex-1">
                      {program.description}
                    </p>
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
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
