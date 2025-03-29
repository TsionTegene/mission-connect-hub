
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, User, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

type Donation = {
  id: string;
  user_id: string | null;
  amount: number;
  currency: string;
  payment_method: string;
  payment_status: string;
  transaction_date: string;
  is_anonymous: boolean;
  notes: string | null;
};

type DonationStats = {
  totalAmount: number;
  averageAmount: number;
  donationCount: number;
  largestDonation: number;
};

type ChartData = {
  name: string;
  amount: number;
};

const timeRanges = [
  { value: "7days", label: "Last 7 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "90days", label: "Last 90 Days" },
  { value: "1year", label: "Last Year" },
  { value: "all", label: "All Time" },
];

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const DonationsManager = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("all");
  const [stats, setStats] = useState<DonationStats>({
    totalAmount: 0,
    averageAmount: 0,
    donationCount: 0,
    largestDonation: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    fetchDonations();
  }, [timeRange]);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = donations.filter(donation => 
        donation.payment_method.toLowerCase().includes(query) ||
        (donation.notes && donation.notes.toLowerCase().includes(query))
      );
      setFilteredDonations(filtered);
    } else {
      setFilteredDonations(donations);
    }
  }, [searchQuery, donations]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('donations')
        .select('*')
        .order('transaction_date', { ascending: false });
      
      // Apply time filter if not "all"
      if (timeRange !== "all") {
        const now = new Date();
        let startDate = new Date();
        
        switch (timeRange) {
          case "7days":
            startDate.setDate(now.getDate() - 7);
            break;
          case "30days":
            startDate.setDate(now.getDate() - 30);
            break;
          case "90days":
            startDate.setDate(now.getDate() - 90);
            break;
          case "1year":
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        }
        
        query = query.gte('transaction_date', startDate.toISOString());
      }
      
      const { data, error } = await query;
        
      if (error) throw error;
      
      setDonations(data || []);
      setFilteredDonations(data || []);
      calculateStats(data || []);
      prepareChartData(data || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to load donation data");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Donation[]) => {
    if (data.length === 0) {
      setStats({
        totalAmount: 0,
        averageAmount: 0,
        donationCount: 0,
        largestDonation: 0,
      });
      return;
    }
    
    const total = data.reduce((sum, donation) => sum + donation.amount, 0);
    const largest = Math.max(...data.map(donation => donation.amount));
    
    setStats({
      totalAmount: total,
      averageAmount: total / data.length,
      donationCount: data.length,
      largestDonation: largest,
    });
  };

  const prepareChartData = (data: Donation[]) => {
    // Group by day/week/month depending on time range
    const grouped: Record<string, number> = {};
    
    data.forEach(donation => {
      let dateKey;
      const date = new Date(donation.transaction_date);
      
      if (timeRange === "7days") {
        // Group by day for last 7 days
        dateKey = date.toLocaleDateString();
      } else if (timeRange === "30days") {
        // Group by week for last 30 days
        const weekNum = Math.floor(date.getDate() / 7) + 1;
        dateKey = `Week ${weekNum}`;
      } else {
        // Group by month for longer periods
        dateKey = date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
      }
      
      grouped[dateKey] = (grouped[dateKey] || 0) + donation.amount;
    });
    
    // Convert grouped data to chart format
    const chartItems = Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
    
    // Sort chronologically if date-based
    if (timeRange === "7days") {
      chartItems.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    }
    
    setChartData(chartItems);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h2 className="text-2xl font-semibold">Donations</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search donations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="py-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Total Donations</p>
            </div>
            <p className="text-2xl font-bold mt-2">
              {loading ? "..." : formatCurrency(stats.totalAmount)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="py-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Donation Count</p>
            </div>
            <p className="text-2xl font-bold mt-2">
              {loading ? "..." : stats.donationCount}
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="py-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Average Donation</p>
            </div>
            <p className="text-2xl font-bold mt-2">
              {loading ? "..." : formatCurrency(stats.averageAmount)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="py-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Largest Donation</p>
            </div>
            <p className="text-2xl font-bold mt-2">
              {loading ? "..." : formatCurrency(stats.largestDonation)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Donation Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Bar dataKey="amount" fill="#8884d8" name="Donations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-lg font-medium mt-6">Donation Records</h3>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <p>Loading donations...</p>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p>No donations found for the selected time period.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <Card key={donation.id} className="glass">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">
                          {formatCurrency(donation.amount)}
                        </h3>
                        
                        <Badge variant="outline">
                          {donation.payment_method}
                        </Badge>
                        
                        {donation.is_anonymous && (
                          <Badge variant="secondary">
                            Anonymous
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(donation.transaction_date).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <Badge
                      variant={donation.payment_status === "succeeded" ? "default" : "outline"}
                    >
                      {donation.payment_status}
                    </Badge>
                    
                    {donation.notes && (
                      <div className="pt-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Notes:</span>
                        </div>
                        <p className="mt-1 pl-6 text-foreground/80 text-sm">{donation.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationsManager;
