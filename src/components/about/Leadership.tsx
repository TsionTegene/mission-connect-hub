
import { User, Users, GraduationCap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import WImage from "../../assets/w.jpg";
import GMImage from "../../assets/gm.jpg";
import DMImage from "../../assets/dm.jpg";
import DNImage from "../../assets/dn.jpg";
import DDMImage from "../../assets/ddm.jpg";
import HSImage from "../../assets/hs.jpg";
import GTImage from "../../assets/gt.jpg";
const Leadership = () => {
  const leaders = [
    {
      name: "Dr. Wondwosen Moureta (DVM, BTh, MSc in Intercultural Studies)",
      title: "President, short term missionary",
      bio: "Dr. Wondwosen Moureta, veterinarian and theologian, is the founder of Live Message Ministry, dedicated to equipping the Church to reach unreached communities through discipleship, missions, and Spirit-led leadership.",
      image: WImage,
    },
    {
      name: "Getu Melese",
      title: "Finance Officer, logistic and support coordinator",
      bio: "Getu Melese is a devoted Christian, youth leader, and entrepreneur with over 15 years in ministry. He serves as Finance Officer at Live Message Ministry, supporting global missions.",
      image: GMImage,
    },
    {
      name: "Pastor Daniel Medi  (BTh, MSc in Intercultural Studies)",
      title: "Vice president, short term missionary, prayer and intercession leader",
      bio: "Pastor Daniel Medi Shifa has over 16 years in ministry, dedicated to discipleship and missions. Theologically equipped, he is passionate about reaching and discipling ethnic groups in Ethiopia and beyond.",
      image: DMImage,
    },
    {
      name: "Dawit Nimani (Bsc, BTh)",
      title: "Mission field coordinator, short term missionary",
      bio: "Dawit Nimani leads healing and Holy Spirit baptism programs, teaching restoration and salvation. With degrees in Nursing and Theology, he is pursuing further studies to strengthen his ministry impact.",
      image: DNImage,
    },   
    {
      name: "Hana Sisay (BSc, BTh, MSc in Leadership)",
      title: "Mission field coordinator, short term missionary, compassion ministry leader",
      bio: "Hanna Sisay, with degrees in Nursing, Theology, and Christian Leadership, passionately leads and teaches Sunday school, nurturing the next generation to grow in faith and impact their communities.",
      image: HSImage,
    },
    {
      name: "Dr. Daniel Mekonin (DVM, BTh)",
      title: "Mission field coordinator, short term missionary",
      bio: "Dr. Daniel Mekonnen Kebede (DVM, Theology) is a church elder and youth leader with over 15 years of ministry experience, passionate about discipleship and mission. He is married with two daughters.",
      image: DDMImage,
    },
    {
      name: "Getu Tadese (BTh, MSc in Leadership)",
      title: "Mission field coordinator, short term missionary",
      bio: "Getu Tadesse brings over 30 years of church leadership, serving in administration, mentoring, and outreach. Holding a master’s in leadership, he fosters church unity, growth, and Christ-centered community impact.",
      image: GTImage,
    },
  ];

  const boardMembers = [
    "Thomas Genene, Board Chair",
    "Selam Tesfaye, Vice Chair",
    "Robel Kinfe, Treasurer",
    "Elisabeth Mekbib, Secretary",
    "Rev. Dawit Thompson",
    "Dr. Martha Gobeze",
    "Henok Nega, J.D."
  ];

  return (
    <section id="leadership" className="py-12 md:py-20 bg-secondary/30">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Our Team
          </span>
          <h2 className="section-title">Leadership & Board</h2>
          <p className="section-subtitle mx-auto text-center">
            Meet the dedicated individuals who guide our mission with wisdom and compassion.
          </p>
        </AnimatedSection>

        <div className="mt-12">
          <AnimatedSection>
            <h3 className="text-2xl font-light mb-8 flex items-center">
              <Users className="h-6 w-6 mr-2" />
              Leadership Team
            </h3>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="h-72 overflow-hidden">
                    <img 
                      src={leader.image} 
                      alt={leader.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-lg font-medium">{leader.name}</h4>
                    <p className="text-primary/80 text-sm mb-3">{leader.title}</p>
                    <p className="text-foreground/70 text-sm flex-1">{leader.bio}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* <div className="mt-16">
          <AnimatedSection>
            <h3 className="text-2xl font-light mb-8 flex items-center">
              <GraduationCap className="h-6 w-6 mr-2" />
              Board of Directors
            </h3>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="glass p-8 rounded-xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-4">
                {boardMembers.map((member, index) => (
                  <div key={index} className="flex items-center">
                    <User className="h-5 w-5 text-primary mr-2" />
                    <span>{member}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div> */}
      </div>
    </section>
  );
};

export default Leadership;
