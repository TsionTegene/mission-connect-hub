
import { BookOpen, GitGraph, History as HistoryIcon, Medal } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const History = () => {
  return (
    // <section id="history" className="py-12 md:py-20 section-primary">
    //   <div className="section-container">
    //     <AnimatedSection>
    //       <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-accent/20 text-accent-foreground rounded-full">
    //         Who We Are
    //       </span>
    //       <h2 className="section-title">Our History</h2>
    //       <p className="section-subtitle mx-auto">
    //         Since 2022, Live Message Global Gospel Movement Ministry has been dedicated to live the Gospel and take it to places where it is most needed especially where Christ is not yet known.
    //       </p>
    //     </AnimatedSection>

    //     <div className="grid md:grid-cols-2 gap-12 mt-12">
    //       <AnimatedSection delay={100}>
    //         <div className="relative">
    //           <div className="aspect-video rounded-2xl overflow-hidden">
    //             <img 
    //               src="https://plus.unsplash.com/premium_photo-1726804820336-db042154b96a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8" 
    //               alt="Ministry founders" 
    //               className="object-cover w-full h-full"
    //             />
    //           </div>
    //           <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent rounded-2xl -z-10"></div>
    //         </div>
    //       </AnimatedSection>

    //       <AnimatedSection delay={200}>
    //         <div className="space-y-6">
    //           <div className="card-highlight p-6 rounded-xl">
    //             <div className="flex items-start gap-4">
    //               <HistoryIcon className="h-9 w-16 text-primary mt-1" />
    //               <div>
    //                 <h3 className="text-xl font-medium mb-2">Our Beginnings</h3>
    //                 <p className="text-foreground/80">
    //                   Live Message Global Gospel Movement Ministry began in 2022, driven by a passion to live and proclaim the Gospel where Christ is not yet known.
    //                   It started with a church plant in Gelan Guda, Central Ethiopia, but soon shifted focus to unreached people groups. This led to a long-term mission in South Omo Zone among the Hammar, Bana, and Tsemay tribes—some of Ethiopia’s most spiritually unreached communities. Through biannual mission trips,
    //                   the ministry engages in evangelism, discipleship, church planting, and holistic services. From one church to a growing movement, the ministry continues by obedience, believing every believer is a living message—called to live, sent to go, and committed to reach.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="card-highlight p-6 rounded-xl">
    //             <div className="flex items-start gap-4">
    //               <BookOpen className="h-9 w-16 text-primary mt-1" />
    //               <div>
    //                 <h3 className="text-xl font-medium mb-2">Philosophy of Ministry</h3>
    //                 <p className="text-foreground/80">
    //                 The philosophy of ministry at Live Message Global Gospel Movement Ministry is rooted in Scripture and driven by the Great Commission, focusing on making disciples among all nations—especially the unreached. Centered on Christ and empowered by the Holy Spirit, the ministry embraces a holistic approach that integrates evangelism, discipleship, and compassionate services. It emphasizes living out the Gospel through action, raising indigenous leaders, engaging families and communities, and operating with integrity and urgency to fulfill God’s mission across cultures.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="card-highlight p-6 rounded-xl">
    //             <div className="flex items-start gap-4">
    //               <HistoryIcon className="h-9 w-16 text-primary mt-1" />
    //               <div>
    //                 <h3 className="text-xl font-medium mb-2">Growth and Impact</h3>
    //                 <p className="text-foreground/80">
    //                   By God’s grace, the ministry is experiencing growth and impact in three key areas: spiritually, as people in unreached regions come to Christ and discipleship movements begin; 
    //                   holistically, through compassionate services like veterinary care, health, agriculture, and education that open hearts to the Gospel; and in leadership, as local believers are
    //                   equipped and sent out as leaders and missionaries, sparking a new wave of mission-driven outreach.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="card-highlight p-6 rounded-xl">
    //             <div className="flex items-start gap-4">
    //               <Medal className="h-9 w-16 text-primary mt-1" />
    //               <div>
    //                 <h3 className="text-xl font-medium mb-2">Our Success Story</h3>
    //                 <p className="text-foreground/80">
    //                   Since 2022, Live Message Global Gospel Movement has planted churches, reached Unreached People Groups, and mobilized believers for mission. A church was planted in Gelan Guda and four mission sites were launched among the Hammar, Bana, and Tsemay tribes in South Omo. Through short-term trips, 429 heard the Gospel, 34 came to faith, and over 120 follow-up visits were made. Holistic outreach treated 7,900 animals, reached 203 children, and supported 100+ families. We’ve trained 35 leaders and formed strategic partnerships—all to live the Gospel and multiply disciples among the unreached.
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </AnimatedSection>
    //     </div>
    //   </div>
    // </section>
    <section id="history" className="py-12 md:py-20 section-primary">
  <div className="section-container">
    <AnimatedSection>
      <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-accent/20 text-accent-foreground rounded-full">
        Who We Are
      </span>
      <h2 className="section-title">Our History</h2>
      <p className="section-subtitle mx-auto">
        Since 2022, Live Message Global Gospel Movement Ministry has been dedicated to live the Gospel and take it to places where it is most needed especially where Christ is not yet known.
      </p>
    </AnimatedSection>

    <div className="grid md:grid-cols-2 gap-12 mt-12">
      {/* Image and first card */}
      <AnimatedSection delay={100}>
        <div className="space-y-6">
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1726804820336-db042154b96a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wxfHx8ZW58MHx8fHx8"
                alt="Ministry founders"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent rounded-2xl -z-10"></div>
          </div>

          {/* Our Beginnings */}
          <div className="card-highlight p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <HistoryIcon className="h-9 w-16 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Our Beginnings</h3>
                <p className="text-foreground/80">
                  Live Message Global Gospel Movement Ministry began in 2022, driven by a passion to live and proclaim the Gospel where Christ is not yet known.
                   It started with a church plant in Gelan Guda, Central Ethiopia, but soon shifted focus to unreached people groups. This led to a long-term mission in South Omo Zone among the Hammar, Bana, and Tsemay tribes—some of Ethiopia’s most spiritually unreached communities. Through biannual mission trips,
                   the ministry engages in evangelism, discipleship, church planting, and holistic services. From one church to a growing movement, the ministry continues by obedience, believing every believer is a living message—called to live, sent to go, and committed to reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Second column: Growth + Success */}
      <AnimatedSection delay={200}>
        <div className="space-y-6">
          {/* Growth and Impact */}
          <div className="card-highlight p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <GitGraph className="h-9 w-16 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Growth and Impact</h3>
                <p className="text-foreground/80">
                  By God’s grace, the ministry is experiencing growth and impact in three key areas: spiritually, as people in unreached regions come to Christ and discipleship movements begin; 
                   holistically, through compassionate services like veterinary care, health, agriculture, and education that open hearts to the Gospel; and in leadership, as local believers are
                   equipped and sent out as leaders and missionaries, sparking a new wave of mission-driven outreach.
                </p>
              </div>
            </div>
          </div>

          {/* Success Story */}
          <div className="card-highlight p-6 rounded-xl">
            <div className="flex items-start gap-4">
              <Medal className="h-9 w-16 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-medium mb-2">Our Success Story</h3>
                <p className="text-foreground/80">
                  Since 2022, Live Message Global Gospel Movement has planted churches, reached Unreached People Groups, and mobilized believers for mission. A church was planted in Gelan Guda and four mission sites were launched among the Hammar, Bana, and Tsemay tribes in South Omo. Through short-term trips, 429 heard the Gospel, 34 came to faith, and over 120 follow-up visits were made. Holistic outreach treated 7,900 animals, reached 203 children, and supported 100+ families. We’ve trained 35 leaders and formed strategic partnerships—all to live the Gospel and multiply disciples among the unreached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>

    {/* 🔽 Move Philosophy of Ministry below the grid layout */}
    <AnimatedSection delay={300}>
      <div className="mt-12">
        <div className="card-highlight p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <BookOpen className="h-9 w-16 text-primary mt-1" />
            <div>
              <h3 className="text-xl font-medium mb-2">Philosophy of Ministry</h3>
              <p className="text-foreground/80">
                The philosophy of ministry at Live Message Global Gospel Movement Ministry is rooted in Scripture and driven by the Great Commission, focusing on making disciples among all nations—especially the unreached. Centered on Christ and empowered by the Holy Spirit, the ministry embraces a holistic approach that integrates evangelism, discipleship, and compassionate services. It emphasizes living out the Gospel through action, raising indigenous leaders, engaging families and communities, and operating with integrity and urgency to fulfill God’s mission across cultures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  </div>
</section>
  );
};

export default History;
