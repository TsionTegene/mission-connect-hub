
import { BookOpen, History as HistoryIcon } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const History = () => {
  return (
    <section id="history" className="py-12 md:py-20">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Who We Are
          </span>
          <h2 className="section-title">Our History</h2>
          <p className="section-subtitle mx-auto">
            Since 1998, Grace Mission has been dedicated to transforming lives through compassionate service.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <AnimatedSection delay={100}>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80" 
                  alt="Ministry founders" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary rounded-2xl -z-10"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="space-y-6">
              <div className="glass p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <HistoryIcon className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Our Beginnings</h3>
                    <p className="text-foreground/80">
                      Founded by John and Mary Thompson in 1998, Grace Mission began as a small local outreach program serving the community of Springfield. What started as feeding the homeless once a week grew into a global ministry touching thousands of lives.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <BookOpen className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Philosophy of Ministry</h3>
                    <p className="text-foreground/80">
                      We believe in the transformative power of compassion combined with practical action. Our approach integrates spiritual guidance with tangible assistance, creating sustainable solutions that empower individuals and communities to thrive independently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <HistoryIcon className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-medium mb-2">Growth and Impact</h3>
                    <p className="text-foreground/80">
                      Over the past 25 years, we've expanded to operate in 40 countries, built 120 schools, established 35 medical clinics, and trained over 5,000 local leaders. Our focus remains on creating lasting change through community partnership.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default History;
