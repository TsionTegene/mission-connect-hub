
import { Calendar, MapPin, Clock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Prayer Breakfast",
      date: "June 15, 2024",
      time: "8:00 AM - 10:00 AM",
      location: "Grace Mission Center",
      description:
        "Join us for a morning of fellowship, prayer, and breakfast as we lift up our community's needs together.",
      image:
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Mission Trip to Omo",
      date: "March 13-17, 2025",
      time: "All Day",
      location: "South Omo, Jinka",
      description:
        "Our annual mission trip focused on construction projects and children's ministry in underserved communities.",
      image:
        "https://images.unsplash.com/photo-1524734627574-bbb084c4ee66?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 3,
      title: "Worship Night",
      date: "August 5, 2024",
      time: "7:00 PM - 9:00 PM",
      location: "Grace Mission Sanctuary",
      description:
        "An evening dedicated to praise and worship, featuring our worship team and guest musicians.",
      image:
        "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="events" className="py-12 md:py-20 bg-secondary/30">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Upcoming
          </span>
          <h2 className="section-title">Events & Gatherings</h2>
          <p className="section-subtitle mx-auto text-center">
            Join us for these upcoming opportunities to connect, serve, and grow in faith together.
          </p>
        </AnimatedSection>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {upcomingEvents.map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 100}>
              <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-medium mb-3">{event.title}</h3>
                  
                  <div className="flex items-center mb-2 text-sm text-foreground/80">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center mb-2 text-sm text-foreground/80">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center mb-4 text-sm text-foreground/80">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <p className="text-foreground/80 text-sm flex-1 mb-4">{event.description}</p>
                  
                  <Button className="w-full mt-auto">Register Now</Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <AnimatedSection>
            <a href="#" className="button-outline">
              View All Events
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Events;
