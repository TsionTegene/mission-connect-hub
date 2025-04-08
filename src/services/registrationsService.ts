
export type Registration = {
  id: string;
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  created_at: string;
};

// Mock data for frontend development
const mockRegistrations: Registration[] = [
  {
    id: "1",
    event_id: "event-1",
    event_title: "Sunday Service",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    notes: "Looking forward to attending",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    event_id: "event-2",
    event_title: "Youth Conference",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    notes: null,
    created_at: new Date().toISOString()
  }
];

export const fetchRegistrations = async (): Promise<Registration[]> => {
  // This is now a mock function that returns sample data
  // Replace with your own backend API call when ready
  console.log("Fetching registrations (mock)");
  return Promise.resolve([...mockRegistrations]);
};

export const deleteRegistration = async (id: string): Promise<boolean> => {
  // This is now a mock function that simulates deletion
  // Replace with your own backend API call when ready
  console.log("Deleting registration with ID (mock):", id);
  return Promise.resolve(true);
};
