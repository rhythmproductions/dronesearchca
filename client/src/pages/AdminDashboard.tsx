import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ExternalLink, LogOut, ArrowLeft, Save, BarChart3, CheckCircle2 } from "lucide-react";
import { getFundingAmount, updateFundingAmount } from "@/components/FundingThermometer";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Funding amount state
  const [fundingAmount, setFundingAmount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = sessionStorage.getItem("admin_authenticated") === "true";
    if (!authenticated) {
      setLocation("/admin/login");
    } else {
      setIsAuthenticated(true);
      
      // Load current funding amount
      const currentFunding = getFundingAmount();
      setFundingAmount(currentFunding);
    }
  }, [setLocation]);
  
  const handleSaveFundingAmount = () => {
    updateFundingAmount(fundingAmount);
    toast.success('Funding amount updated successfully!');
    
    // Show green success state for 3 seconds
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setLocation("/");
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Analytics events being tracked
  const trackedEvents = [
    { category: "Page Views", description: "Every page load and visitor session" },
    { category: "Scroll Depth", description: "How far visitors scroll (25%, 50%, 75%, 100%)" },
    { category: "Section Views", description: "Which sections visitors see (Visual Proof, Founding Opportunities, etc.)" },
    { category: "CTA Clicks", description: "All button clicks and navigation actions" },
    { category: "Form Interactions", description: "Form starts, field interactions, and submissions" },
    { category: "Time on Page", description: "How long visitors spend on the site" },
    { category: "Video Engagement", description: "Video package views and interactions" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0B2D59] text-white py-6">
        <div className="container max-w-7xl flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-white/80 mt-1">DroneSearch.ca - Manage your site</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl py-8">
        {/* Funding Tracker Management */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Manage Funding Tracker</CardTitle>
            <CardDescription className="text-green-800">
              Update the current funding amount. The thermometer will show progress toward $12,000 goal and $15,000 stretch goal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="funding-amount" className="text-sm font-semibold text-green-900">
                  Current Funding Amount
                </Label>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-lg font-bold text-gray-700">$</span>
                  <Input
                    id="funding-amount"
                    type="number"
                    min="0"
                    step="100"
                    value={fundingAmount}
                    onChange={(e) => setFundingAmount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600">of $15,000 stretch goal</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div>Goal: $12,000 - Purchase thermal equipment</div>
                  <div>Stretch Goal: $15,000 - Add backup battery system and extended warranty</div>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={handleSaveFundingAmount}
                  className={isSaved ? "bg-green-600 hover:bg-green-600" : "bg-[#FF6200] hover:bg-[#FF6200]/90"}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaved ? "Amount Updated" : "Update Funding Amount"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <Card className="mb-8 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Google Analytics Dashboard
                </CardTitle>
                <CardDescription className="text-blue-800 mt-2">
                  View detailed visitor analytics, behavior, and conversion data
                </CardDescription>
              </div>
              <Button 
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <a 
                  href="https://analytics.google.com/analytics/web/#/p468694629/reports/intelligenthome" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Open Google Analytics
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Analytics Tracking Active
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Your website is actively tracking visitor behavior and sending data to Google Analytics. 
                All events are being recorded and are available in your Google Analytics dashboard.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">What's Being Tracked:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {trackedEvents.map((event) => (
                    <div key={event.category} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.category}</div>
                        <div className="text-xs text-gray-600">{event.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> For real-time data, use the "Realtime" report in Google Analytics. 
                  For historical data and trends, check the "Reports" section. All custom events are visible under Events → All events.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Useful resources for managing your site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                asChild
                variant="outline"
                className="justify-start h-auto py-4"
              >
                <a 
                  href="https://analytics.google.com/analytics/web/#/p468694629/reports/intelligenthome" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="text-left">
                    <div className="font-semibold">Google Analytics Home</div>
                    <div className="text-xs text-muted-foreground">View all reports and data</div>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                className="justify-start h-auto py-4"
              >
                <a 
                  href="https://analytics.google.com/analytics/web/#/p468694629/reports/realtime" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="text-left">
                    <div className="font-semibold">Realtime Report</div>
                    <div className="text-xs text-muted-foreground">See current visitors and activity</div>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                className="justify-start h-auto py-4"
              >
                <a 
                  href="https://app.netlify.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="text-left">
                    <div className="font-semibold">Netlify Dashboard</div>
                    <div className="text-xs text-muted-foreground">Manage deployments and settings</div>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>

              <Button 
                asChild
                variant="outline"
                className="justify-start h-auto py-4"
              >
                <a 
                  href="https://github.com/rhythmproductions/dronesearchca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="text-left">
                    <div className="font-semibold">GitHub Repository</div>
                    <div className="text-xs text-muted-foreground">View code and push updates</div>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
