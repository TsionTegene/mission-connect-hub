
import { useEffect, useRef } from "react";
import { ArrowDownCircle } from "lucide-react";

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center"
          style={{ opacity: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-background/90"></div>
        </div>
      </div>
      
      {/* Parallax Effect */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ 
          backgroundImage: "radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
          transform: "translateY(0px)"
        }}
      ></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center">
        <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white/10 backdrop-blur-sm rounded-full animate-fade-in">
          Faith • Service • Community
        </span>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 max-w-4xl animate-fade-up" style={{animationDelay: "300ms"}}>
          Bringing Hope to Communities Around the World
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl animate-fade-up" style={{animationDelay: "600ms"}}>
          We believe in the power of compassion and service to transform lives and build a more just world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{animationDelay: "900ms"}}>
          <a href="#donate" className="button-primary">
            Support Our Mission
          </a>
          <a href="#mission" className="button-outline">
            Learn More
          </a>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <a href="#mission" className="text-foreground/70 hover:text-foreground transition-colors">
          <ArrowDownCircle size={36} strokeWidth={1} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
