// src/services/registrationsService.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export type EventSummary = {
  id: string;
  title: string;
};

// ✅ Fetch registrations from backend
export const fetchRegistrations = async (): Promise<Registration[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/registrations`);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      throw new Error("Invalid response format");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
};

// ✅ Delete registration by ID
export const deleteRegistration = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`${BASE_URL}/api/event/registrations/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (error) {
    console.error("Error deleting registration:", error);
    return false;
  }
};


// ✅ Fetch events from backend
export const fetchEvents = async (): Promise<EventSummary[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/event`);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      throw new Error("Invalid response format");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export type RegistrationPayload = {
  event_id: number; // 🔥 Must match DB type (INT)
  event_title: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
};

export const registerForEvent = async (registration: RegistrationPayload): Promise<void> => {
  const res = await fetch(`${BASE_URL}/api/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(registration),
  });

  if (!res.ok) {
    throw new Error("Failed to register for event");
  }
};
