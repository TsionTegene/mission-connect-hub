
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import History from "@/components/about/History";
import Statement from "@/components/about/Statement";
import Strategies from "@/components/about/Strategies";
import Leadership from "@/components/about/Leadership";
import AnimatedSection from "@/components/AnimatedSection";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutHero />
      <History />
      <Statement />
      <Strategies />
      <Leadership />
      <Footer />
    </div>
  );
};

export default AboutUs;
