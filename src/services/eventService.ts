// src/services/eventService.ts
import { api } from "./api";

export const fetchEvents = () => api.get("/api/event");

export const fetchEventById = (id: string | number) =>
  api.get(`/api/event/${id}`);

export const createEvent = (data: any) =>
  api.post("/api/event", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

export const updateEvent = (id: string | number, data: any) =>
  api.put(`/api/event/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });

export const deleteEvent = (id: string | number) =>
  api.delete(`/api/event/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
  });
