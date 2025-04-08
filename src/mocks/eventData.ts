
// Mock event data for use across components
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

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Community Prayer Breakfast",
    date: "June 15, 2025",
    time: "8:00 AM - 10:00 AM",
    location: "Mulu Wongel Church",
    description:
      "Join us for a morning of fellowship, prayer, and breakfast as we lift up our community's needs together.",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbW11bml0eSUyMHByYXllciUyMGJyZWFrZmFzdHxlbnwwfHwwfHx8MA%3D%3D",
    created_at: new Date().toISOString(),
    is_paid: false,
    price: null
  },
  {
    id: "2",
    title: "Mission Trip to Omo",
    date: "March 13-17, 2025",
    time: "All Day",
    location: "South Omo, Jinka",
    description:
      "Our annual mission trip focused on construction projects and children's ministry in underserved communities.",
    image:
      "https://images.unsplash.com/photo-1524734627574-bbb084c4ee66?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D",
    created_at: new Date().toISOString(),
    is_paid: true,
    price: 250
  },
  {
    id: "3",
    title: "Worship Night",
    date: "August 5, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Mulu Wongel Church",
    description:
      "An evening dedicated to praise and worship, featuring our worship team and guest musicians.",
    image:
      "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString(),
    is_paid: false,
    price: null
  },
];

export const getMockEvent = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};
