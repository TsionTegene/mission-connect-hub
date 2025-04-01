
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type RegistrationFiltersProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedEvent: string;
  setSelectedEvent: (eventId: string) => void;
  uniqueEvents: { id: string; title: string }[];
  onRefresh: () => void;
};

const RegistrationFilters = ({
  searchQuery,
  setSearchQuery,
  selectedEvent,
  setSelectedEvent,
  uniqueEvents,
  onRefresh,
}: RegistrationFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search registrations..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <select
        className="px-3 py-2 rounded-md border bg-transparent text-sm"
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="all">All Events</option>
        {uniqueEvents.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>
      
      <Button variant="outline" onClick={onRefresh} size="sm">
        Refresh
      </Button>
    </div>
  );
};

export default RegistrationFilters;
