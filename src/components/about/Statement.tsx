
import { Heart, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Statement = () => {
  const beliefs = [
    {
      title: "The Bible",
      content: "We believe the Bible is the inspired, infallible Word of God and our ultimate authority for faith and practice."
    },
    {
      title: "God",
      content: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit."
    },
    {
      title: "Jesus Christ",
      content: "We believe in the deity of Jesus Christ, His virgin birth, sinless life, atoning death, bodily resurrection, and His coming return."
    },
    {
      title: "Salvation",
      content: "We believe salvation is by grace through faith in Jesus Christ alone, not by works."
    },
    {
      title: "The Holy Spirit",
      content: "We believe in the present ministry of the Holy Spirit who indwells believers and empowers them to live godly lives."
    },
    {
      title: "The Church",
      content: "We believe the church is the body of Christ, consisting of all believers, called to worship, fellowship, and service."
    }
  ];

  return (
    <section id="statement" className="py-12 md:py-20 bg-primary/5">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            What We Believe
          </span>
          <h2 className="section-title">Statement of Faith</h2>
          <p className="section-subtitle mx-auto text-center">
            Our work is guided by these foundational biblical beliefs that shape our mission and approach.
          </p>
        </AnimatedSection>

        <div className="mt-12 flex flex-col md:flex-row gap-8">
          <AnimatedSection delay={100} className="md:w-1/3">
            <div className="glass h-full p-8 rounded-xl flex flex-col items-center text-center">
              <Heart className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-2xl font-medium mb-4">Our Core Commitments</h3>
              <p className="text-foreground/80">
                These beliefs aren't just statements we affirm—they're the foundation that informs every aspect of our ministry. They guide our decisions, shape our programs, and direct our service to others.
              </p>
              <div className="mt-8">
                <Shield className="h-12 w-12 mx-auto text-accent" />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} className="md:w-2/3">
            <div className="glass p-8 rounded-xl">
              <div className="grid md:grid-cols-2 gap-6">
                {beliefs.map((belief, index) => (
                  <div key={index} className="border-b border-white/20 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-lg font-medium mb-2">{belief.title}</h4>
                    <p className="text-foreground/80 text-sm">{belief.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Statement;
