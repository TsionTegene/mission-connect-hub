
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type AnalyticsEvent = {
  id: string;
  event_type: string;
  page_path: string;
  created_at: string;
  event_data: any;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#8DD1E1'];

// Mock analytics data
const generateMockData = (timeRange: string): AnalyticsEvent[] => {
  const now = new Date();
  const events: AnalyticsEvent[] = [];
  
  // Generate number of events based on time range
  let numEvents = 20;
  switch (timeRange) {
    case "24h":
      numEvents = 15;
      break;
    case "7days":
      numEvents = 30;
      break;
    case "30days":
      numEvents = 60;
      break;
    case "90days":
      numEvents = 120;
      break;
  }
  
  // Pages to generate views for
  const pages = ['/', '/about', '/events', '/donate', '/auth', '/profile'];
  const eventTypes = ['page_view', 'button_click', 'form_submit', 'video_play', 'donation'];
  
  // Generate events
  for (let i = 0; i < numEvents; i++) {
    // Random date within the range
    const daysAgo = timeRange === "24h" ? Math.random() 
                 : timeRange === "7days" ? Math.random() * 7 
                 : timeRange === "30days" ? Math.random() * 30 
                 : Math.random() * 90;
    
    const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    
    // Random event type and page
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const page = pages[Math.floor(Math.random() * pages.length)];
    
    events.push({
      id: `mock-${i}-${Date.now()}`,
      event_type: eventType,
      page_path: page,
      created_at: date.toISOString(),
      event_data: {
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0'
      }
    });
  }
  
  return events;
};

const AnalyticsDashboard = () => {
  const [pageViews, setPageViews] = useState<Record<string, number>>({});
  const [eventCounts, setEventCounts] = useState<Record<string, number>>({});
  const [timeRange, setTimeRange] = useState("7days");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);
  
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Use mock data instead of Supabase
      const mockEvents = generateMockData(timeRange);
      processAnalyticsData(mockEvents);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const processAnalyticsData = (data: AnalyticsEvent[]) => {
    // Process page views
    const views: Record<string, number> = {};
    const events: Record<string, number> = {};
    
    data.forEach(event => {
      // Count page views
      if (event.event_type === 'page_view') {
        const path = event.page_path;
        views[path] = (views[path] || 0) + 1;
      }
      
      // Count all event types
      events[event.event_type] = (events[event.event_type] || 0) + 1;
    });
    
    setPageViews(views);
    setEventCounts(events);
  };
  
  // Convert data for charts
  const pageViewData = Object.entries(pageViews)
    .map(([path, count]) => ({ name: path, value: count }))
    .sort((a, b) => b.value - a.value) // Sort by highest views
    .slice(0, 10); // Top 10 pages
    
  const eventCountData = Object.entries(eventCounts)
    .map(([type, count]) => ({ name: type, value: count }));
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : Object.values(pageViews).reduce((a, b) => a + b, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : Object.values(eventCounts).reduce((a, b) => a + b, 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : Object.keys(pageViews).length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : Object.keys(eventCounts).length}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most viewed pages in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <p>Loading data...</p>
              </div>
            ) : pageViewData.length === 0 ? (
              <div className="h-80 flex items-center justify-center">
                <p>No page view data available</p>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={pageViewData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tickFormatter={(value) => {
                        // Truncate long paths
                        return value.length > 15 ? value.substring(0, 15) + '...' : value;
                      }}
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle>Event Distribution</CardTitle>
            <CardDescription>Events by type in the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <p>Loading data...</p>
              </div>
            ) : eventCountData.length === 0 ? (
              <div className="h-80 flex items-center justify-center">
                <p>No event data available</p>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={eventCountData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {eventCountData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
