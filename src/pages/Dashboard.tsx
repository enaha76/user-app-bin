import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileBarChart,
  MapPin,
  Clock,
  CheckCircle,
  Coins,
  Camera,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { getUserReports } from "@/lib/api";

// Mock data for demonstration
const mockReports = [
  {
    id: "REP001",
    location: "Central Park, Bin #42",
    status: "pending",
    urgency: "high",
    timestamp: "2024-01-15T10:30:00Z",
    reward: 50,
    image: "/placeholder.svg",
  },
  {
    id: "REP002",
    location: "Downtown Plaza, Bin #128",
    status: "cleaned",
    urgency: "medium",
    timestamp: "2024-01-14T15:45:00Z",
    reward: 25,
    image: "/placeholder.svg",
  },
  {
    id: "REP003",
    location: "Main Street, Bin #67",
    status: "verified",
    urgency: "critical",
    timestamp: "2024-01-13T09:20:00Z",
    reward: 75,
    image: "/placeholder.svg",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "verified":
      return "bg-blue-100 text-blue-800";
    case "cleaned":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "low":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "high":
      return "bg-orange-100 text-orange-800";
    case "critical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Dashboard = () => {
  const { userId } = useUser();
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalRewards, setTotalRewards] = useState(0);

  useEffect(() => {
    loadReports();
  }, [userId]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const data = await getUserReports(userId);
      setReports(data.reports || []);
      setTotalRewards(data.totalRewards || 0);
    } catch (error) {
      console.error("Failed to load reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-eco-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">
          Track your waste reports, rewards, and environmental impact
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">
              Your waste reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ECO Tokens Earned
            </CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRewards}</div>
            <p className="text-xs text-muted-foreground">
              From verified reports
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bins Cleaned
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reports.filter((r) => r.status === "cleaned").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Impact verified
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Reports</span>
            <Button asChild variant="ghost" size="sm">
              <Link to="/report">
                Submit New Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No reports yet</p>
              <Button asChild>
                <Link to="/report">Submit Your First Report</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.reportId}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {report.location?.address || report.binId}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Badge className={getUrgencyColor(report.aiAnalysis?.urgency)}>
                          {report.aiAnalysis?.urgency}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-eco-600 font-semibold">
                        <Coins className="h-4 w-4" />
                        {report.rewardAmount || 0} ECO
                      </span>
                      <span className="text-muted-foreground">ID: {report.reportId}</span>
                      {report.isFirstReport && (
                        <Badge variant="secondary" className="text-xs">
                          🏆 First Reporter
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </CardContent>
      </Card>

      {/* Coming Soon Notice */}
      <Card className="bg-gradient-to-br from-eco-50 to-nature-50 border-eco-200">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-eco-100">
            <FileBarChart className="h-8 w-8 text-eco-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Enhanced Dashboard Coming Soon
          </h3>
          <p className="text-gray-600 mb-4">
            We're working on advanced analytics, detailed reporting, and more
            interactive features for your dashboard.
          </p>
          <Badge variant="secondary" className="bg-eco-100 text-eco-700">
            In Development
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
