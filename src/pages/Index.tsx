import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Programs from "@/components/Programs";
import Ministries from "@/components/Ministries";
import Events from "@/components/Events";
import GetInvolved from "@/components/GetInvolved";
import CompassionProjects from "@/components/CompassionProjects";
import Footer from "@/components/Footer";

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = anchor.getAttribute("href") || "";
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });

          // Update URL without reload
          window.history.pushState(null, "", targetId);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Mission />
      <Ministries />
      <Programs />
      <CompassionProjects />
      <Events />
      <GetInvolved />
      <Footer />
    </div>
  );
};

export default Index;
