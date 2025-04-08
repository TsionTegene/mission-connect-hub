
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock donation data
type Donation = {
  id: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  currency: string;
  category: string;
  message: string | null;
  created_at: string;
  payment_method: string;
  payment_status: string;
  receipt_sent: boolean;
};

const mockDonations: Donation[] = [
  {
    id: "d1",
    donor_name: "John Smith",
    donor_email: "john@example.com",
    amount: 100,
    currency: "USD",
    category: "General",
    message: "Blessed to support the church's mission.",
    created_at: "2025-03-15T14:25:32Z",
    payment_method: "credit_card",
    payment_status: "completed",
    receipt_sent: true
  },
  {
    id: "d2",
    donor_name: "Jane Doe",
    donor_email: "jane@example.com",
    amount: 50,
    currency: "USD",
    category: "Building Fund",
    message: null,
    created_at: "2025-03-14T10:12:45Z",
    payment_method: "paypal",
    payment_status: "completed",
    receipt_sent: true
  },
  {
    id: "d3",
    donor_name: "Michael Johnson",
    donor_email: "michael@example.com",
    amount: 200,
    currency: "USD",
    category: "Missions",
    message: "For the Omo mission trip",
    created_at: "2025-03-10T16:35:22Z",
    payment_method: "credit_card",
    payment_status: "completed",
    receipt_sent: true
  },
  {
    id: "d4",
    donor_name: "Sarah Williams",
    donor_email: "sarah@example.com",
    amount: 75,
    currency: "USD",
    category: "Youth Ministry",
    message: "To support the youth conference",
    created_at: "2025-03-05T09:48:30Z",
    payment_method: "credit_card",
    payment_status: "completed",
    receipt_sent: false
  },
  {
    id: "d5",
    donor_name: "David Brown",
    donor_email: "david@example.com",
    amount: 150,
    currency: "USD",
    category: "General",
    message: null,
    created_at: "2025-02-28T13:22:19Z",
    payment_method: "bank_transfer",
    payment_status: "completed",
    receipt_sent: true
  }
];

const CATEGORIES = ["All", "General", "Building Fund", "Missions", "Youth Ministry", "Outreach"];
const DATE_RANGES = ["7days", "30days", "90days", "year", "all"];

const DonationsManager = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateRange, setDateRange] = useState("30days");
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  
  useEffect(() => {
    fetchDonations();
  }, [selectedCategory, dateRange]);
  
  const fetchDonations = async () => {
    try {
      setLoading(true);
      
      // Simulate API call with mock data
      setTimeout(() => {
        // Filter by category if needed
        let filtered = [...mockDonations];
        
        if (selectedCategory !== "All") {
          filtered = filtered.filter(d => d.category === selectedCategory);
        }
        
        // Apply date filtering based on dateRange
        const now = new Date();
        let startDate: Date;
        
        switch (dateRange) {
          case "7days":
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "30days":
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          case "90days":
            startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            break;
          case "year":
            startDate = new Date(now.getFullYear(), 0, 1); // Jan 1 of current year
            break;
          default:
            startDate = new Date(0); // Beginning of time
        }
        
        if (dateRange !== "all") {
          filtered = filtered.filter(d => new Date(d.created_at) >= startDate);
        }
        
        setDonations(filtered);
        generateAnalytics(filtered);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setLoading(false);
    }
  };
  
  const generateAnalytics = (data: Donation[]) => {
    // Group by category
    const categories: Record<string, number> = {};
    
    data.forEach(donation => {
      categories[donation.category] = (categories[donation.category] || 0) + donation.amount;
    });
    
    const chartData = Object.entries(categories).map(([category, amount]) => ({
      name: category,
      amount
    }));
    
    setAnalyticsData(chartData);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter donations based on search term
    const filtered = mockDonations.filter(
      d => 
        d.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.donor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.message && d.message.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setDonations(filtered);
  };
  
  const resetSearch = () => {
    setSearchTerm("");
    fetchDonations();
  };
  
  const getTotalAmount = () => {
    return donations.reduce((total, donation) => total + donation.amount, 0);
  };
  
  const handleSendReceipt = (donationId: string) => {
    // Mark receipt as sent in our mock data
    const updated = donations.map(d => 
      d.id === donationId ? { ...d, receipt_sent: true } : d
    );
    
    setDonations(updated);
    console.log(`Mock: Sending receipt for donation ${donationId}`);
    // In a real app, this would call an API to send the receipt
  };
  
  const filteredDonations = searchTerm ? 
    donations.filter(
      d => 
        d.donor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.donor_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (d.message && d.message.toLowerCase().includes(searchTerm.toLowerCase()))
    ) : 
    donations;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start gap-4 justify-between">
        <h2 className="text-2xl font-bold">Donations</h2>
        
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${getTotalAmount().toFixed(2)} USD
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Donations Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {donations.length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${donations.length > 0 ? (getTotalAmount() / donations.length).toFixed(2) : "0.00"} USD
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass">
        <CardHeader>
          <CardTitle>Donation Analytics</CardTitle>
          <CardDescription>
            Donation amounts by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <p>Loading analytics...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Legend />
                  <Bar dataKey="amount" name="Amount (USD)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-card border rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
          <h3 className="text-lg font-medium">Donation Records</h3>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search donations..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary">Search</Button>
            {searchTerm && (
              <Button type="button" variant="ghost" onClick={resetSearch}>Clear</Button>
            )}
          </form>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading donations...</p>
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No donations found</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{donation.donor_name}</p>
                        <p className="text-sm text-muted-foreground">{donation.donor_email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${donation.amount.toFixed(2)} {donation.currency}
                    </TableCell>
                    <TableCell>{donation.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(donation.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {donation.payment_status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendReceipt(donation.id)}
                        disabled={donation.receipt_sent}
                      >
                        {donation.receipt_sent ? "Receipt Sent" : "Send Receipt"}
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

export default DonationsManager;
