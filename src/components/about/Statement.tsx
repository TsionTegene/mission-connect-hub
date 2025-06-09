
import { Heart, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const Statement = () => {
  const beliefs = [
    {
      title: "The Bible",
      content: "We believe the Bible is the inspired, infallible, and authoritative Word of God, our final guide in all matters of faith and life."
    },
    {
      title: "The Trinity",
      content: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit."
    },
    {
      title: "Jesus Christ",
      content: "We believe Jesus Christ is the eternal Son of God—fully God and fully man—who was born of a virgin, lived a sinless life, died on the cross for our sins, rose bodily from the dead, and will return in power and glory."
    },
    {
      title: "Salvation",
      content: "We believe salvation is by grace through faith in Jesus Christ alone, not by works."
    },
    {
      title: "The Holy Spirit",
      content: "We believe the Holy Spirit indwells and empowers believers for holy living, spiritual gifts, and mission."
    },
    {
      title: "The Church",
      content: "We believe the Church is the Body of Christ, called to worship, disciple, serve, and evangelize. We affirm both the local and global Church."
    },
    {
      title: "Mission and the Second Coming",
      content: "We believe in Christ’s imminent return and in the urgency of fulfilling the Great Commission before His return—making disciples of all nations."
    }
  ];
const foundations = [
    {
      title: "Matthew 28:19–20 — The Great Commission",
      content: "'Go therefore and make disciples of all nations, baptizing them... and teaching them to obey everything I have commanded you.' We obey Christ’s global call to make disciples in every nation– baptizing, teaching, and walking in His promised presence."
    },
    {
      title: "Romans 15:20 — The Apostolic Vision",
      content: "'It has always been my ambition to preach the gospel where Christ was not known...' Our ministry is driven by a passion to reach unreached peoples, especially those without access to the Gospel."
    },
    {
     title: "2nd Corinthians 3:3 — Living the Message",
      content: "'You are a letter from Christ... written not with ink but with the Spirit of the living God.' We believe in being a Live Message– a visible, Spirit-written letter of Christ, demonstrated through our lives, not just our words."
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
                The ministry is guided by ten core commitments: living by biblical truth, depending on prayer and fasting, prioritizing the unreached, serving the whole person, relying on the Holy Spirit, making multiplying disciples, communicating the Gospel in culturally relevant ways, practicing integrity and accountability, promoting unity in the Body of Christ, and following Christ with sacrificial obedience.
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
        <div className="mt-12 flex flex-col md:flex-row gap-8">
          <h2 className="section-title mx-auto text-center">Biblical Foundations</h2>
           <AnimatedSection delay={200} className="md:w-2/3">
            <div className="glass p-8 rounded-xl">
              <div className="grid md:grid-cols-2 gap-6">
                {foundations.map((foundation, index) => (
                  <div key={index} className="border-b border-white/20 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="text-lg font-medium mb-2">{foundation.title}</h4>
                    <p className="text-foreground/80 text-sm">{foundation.content}</p>
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
