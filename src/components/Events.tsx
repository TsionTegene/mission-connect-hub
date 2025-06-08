import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Link } from "react-router-dom";
import EventRegistration from "./EventRegistration";
import { fetchEvents as fetchBackendEvents } from "@/services/eventService";

// Define an event type
export type Event = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  image?: string;
  created_at: string;
  is_paid: boolean;
  price: number | null;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetchBackendEvents();
      const fetchedEvents = res?.data ?? res;
      if (Array.isArray(fetchedEvents)) {
         console.log(" Events with image:", fetchedEvents.map(e => ({
        title: e.title,
        image: e.image
      })));
        setEvents(fetchedEvents);
      }
    } catch (error) {
      console.error("Unexpected error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const visibleEvents = showAll ? events : events.slice(0, 3);

  return (
    <section id="events" className="py-12 md:py-20 section-accent">
      <div className="section-container">
        <AnimatedSection>
          <span className="inline-block mb-4 px-3 py-1 text-xs tracking-widest uppercase bg-white rounded-full">
            Upcoming
          </span>
          <h2 className="section-title">Events & Gatherings</h2>
          <p className="section-subtitle mx-auto text-center">
            Uniting believers through worship, mission trips, and fundraising to serve and disciple the unreached.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {visibleEvents.map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 100}>
              <div className="glass rounded-xl overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image || "https://via.placeholder.com/400x300?text=No+Image"}  
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-medium mb-3">{event.title}</h3>

                  <div className="flex items-center mb-2 text-sm text-foreground/80">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>

                  {event.time && (
                    <div className="flex items-center mb-2 text-sm text-foreground/80">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                  )}

                  <div className="flex items-center mb-2 text-sm text-foreground/80">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>

                  {event.is_paid && event.price && (
                    <div className="flex items-center mb-2 text-sm font-medium">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      <span>${event.price} USD</span>
                    </div>
                  )}

                  <p className="text-foreground/80 text-sm flex-1 mb-4">{event.description || ""}</p>

                  {event.is_paid && event.price ? (
                    <Link to={`/event-payment/${event.id}`}>
                      <Button className="w-full mt-auto">Register & Pay</Button>
                    </Link>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-auto" onClick={() => setSelectedEvent(event)}>
                          Register Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        {selectedEvent && (
                          <EventRegistration 
                            eventId={selectedEvent.id} 
                            eventTitle={selectedEvent.title}
                            onClose={() => setSelectedEvent(null)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {events.length > 3 && (
          <div className="mt-12 text-center">
            <AnimatedSection>
              <Button onClick={() => setShowAll(!showAll)} variant="outline">
                {showAll ? "Show Less" : "View All Events"}
              </Button>
            </AnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
