
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Mail, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { mockEvents } from "@/mocks/eventData";

type Registration = {
  id: string;
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  created_at: string;
};

// Mock data for registrations
const mockRegistrations: Registration[] = [
  {
    id: "reg1",
    event_id: "2",
    event_title: "Mission Trip to Omo",
    name: "John Smith",
    email: "john@example.com",
    phone: "555-123-4567",
    notes: "Looking forward to the trip!",
    created_at: new Date("2025-02-25T14:32:45Z").toISOString()
  },
  {
    id: "reg2",
    event_id: "2",
    event_title: "Mission Trip to Omo",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "555-987-6543",
    notes: null,
    created_at: new Date("2025-02-26T10:15:22Z").toISOString()
  },
  {
    id: "reg3",
    event_id: "3",
    event_title: "Worship Night",
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "555-555-5555",
    notes: "Can I volunteer to help?",
    created_at: new Date("2025-03-01T09:45:12Z").toISOString()
  },
  {
    id: "reg4",
    event_id: "1",
    event_title: "Community Prayer Breakfast",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "555-222-3333",
    notes: "I'll bring a friend",
    created_at: new Date("2025-03-05T15:22:33Z").toISOString()
  }
];

const RegistrationsManager = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statsCounts, setStatsCounts] = useState({
    total: 0,
    byEvent: {} as Record<string, number>
  });

  useEffect(() => {
    fetchRegistrations();
  }, [selectedEvent]);

  const fetchRegistrations = async () => {
    setLoading(true);

    try {
      // Simulate API delay
      setTimeout(() => {
        // Filter by event if needed
        let filtered = [...mockRegistrations];
        
        if (selectedEvent !== "all") {
          filtered = filtered.filter(r => r.event_id === selectedEvent);
        }
        
        setRegistrations(filtered);
        
        // Calculate stats
        const totalCount = filtered.length;
        const countsByEvent: Record<string, number> = {};
        
        filtered.forEach(reg => {
          countsByEvent[reg.event_id] = (countsByEvent[reg.event_id] || 0) + 1;
        });
        
        setStatsCounts({
          total: totalCount,
          byEvent: countsByEvent
        });
        
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setLoading(false);
      toast.error("Failed to fetch registrations");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      return fetchRegistrations();
    }
    
    // Filter registrations based on search term
    const filtered = mockRegistrations.filter(
      r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone.includes(searchTerm) ||
        r.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.notes && r.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    if (selectedEvent !== "all") {
      filtered.filter(r => r.event_id === selectedEvent);
    }
    
    setRegistrations(filtered);
  };
  
  const handleReset = () => {
    setSearchTerm("");
    fetchRegistrations();
  };
  
  const handleContactRegistrant = (email: string) => {
    // Open default mail client
    window.location.href = `mailto:${email}`;
  };
  
  const handleExportCSV = () => {
    // Generate CSV content
    const headers = ["Name", "Email", "Phone", "Event", "Registration Date", "Notes"];
    const csvData = registrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.event_title,
      new Date(reg.created_at).toLocaleDateString(),
      reg.notes || ""
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Registrations exported to CSV");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <h2 className="text-2xl font-bold">Event Registrations</h2>
        
        <div className="flex gap-2 flex-wrap">
          <Select
            value={selectedEvent}
            onValueChange={setSelectedEvent}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {mockEvents.map(event => (
                <SelectItem key={event.id} value={event.id}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline"
            onClick={handleExportCSV}
            disabled={registrations.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : statsCounts.total}
            </div>
          </CardContent>
        </Card>
        
        {selectedEvent !== "all" && (
          <Card className="glass md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {mockEvents.find(e => e.id === selectedEvent)?.title || "Selected Event"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : statsCounts.byEvent[selectedEvent] || 0} registrations
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-lg font-medium">Registration Records</h3>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search registrations..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary">Search</Button>
            {searchTerm && (
              <Button type="button" variant="ghost" onClick={handleReset}>Clear</Button>
            )}
          </form>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {selectedEvent !== "all" 
                ? "No registrations for this event" 
                : "No registrations found"}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.name}</TableCell>
                    <TableCell>
                      <div>
                        <p>{registration.email}</p>
                        <p className="text-sm text-muted-foreground">{registration.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{registration.event_title}</TableCell>
                    <TableCell>
                      {new Date(registration.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm line-clamp-2">
                        {registration.notes || "—"}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleContactRegistrant(registration.email)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="hidden md:inline">Contact</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationsManager;
