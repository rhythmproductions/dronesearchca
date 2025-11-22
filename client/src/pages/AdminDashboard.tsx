import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { BarChart3, Users, MousePointerClick, FileText, LogOut, ArrowLeft, Save } from "lucide-react";
import { getSponsorshipCounts, updateSponsorshipCounts } from "@/components/SponsorshipStatus";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Sponsorship counts state
  const [titleFilled, setTitleFilled] = useState(0);
  const [signatureFilled, setSignatureFilled] = useState(0);
  const [partnerFilled, setPartnerFilled] = useState(0);

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = sessionStorage.getItem("admin_authenticated") === "true";
    if (!authenticated) {
      setLocation("/admin/login");
    } else {
      setIsAuthenticated(true);
      
      // Load current sponsorship counts
      const counts = getSponsorshipCounts();
      setTitleFilled(counts.title.filled);
      setSignatureFilled(counts.signature.filled);
      setPartnerFilled(counts.partner.filled);
    }
  }, [setLocation]);
  
  const handleSaveSponsorshipCounts = () => {
    updateSponsorshipCounts({
      title: { filled: titleFilled, total: 1 },
      signature: { filled: signatureFilled, total: 8 },
      partner: { filled: partnerFilled, total: 12 },
    });
    toast.success('Sponsorship counts updated successfully!');
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setLocation("/");
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Mock analytics data - in production, this would come from your analytics backend
  const analyticsData = {
    pageViews: {
      total: 0,
      today: 0,
      thisWeek: 0,
    },
    scrollDepth: {
      "25%": 0,
      "50%": 0,
      "75%": 0,
      "100%": 0,
    },
    sectionViews: {
      "Visual Proof": 0,
      "Picture This Moment": 0,
      "Why Service Cant Exist": 0,
      "Founding Opportunities": 0,
      "Questions": 0,
      "Meet Your Pilot": 0,
    },
    ctaClicks: {
      "Become a Founding Partner": 0,
      "See How It Works": 0,
    },
    formSubmissions: {
      "Community Email": 0,
      "Sponsor Email": 0,
      "Founding Partner": 0,
    },
    formStarts: {
      "Founding Partner": 0,
    },
    timeOnPage: {
      "< 10s": 0,
      "10-30s": 0,
      "30s-1min": 0,
      "1-2min": 0,
      "2-5min": 0,
      "> 5min": 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0B2D59] text-white py-6">
        <div className="container max-w-7xl flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-white/80 mt-1">DroneSearch.ca - Real-time visitor insights</p>
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
        {/* Sponsorship Management */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-900">Manage Sponsorship Availability</CardTitle>
            <CardDescription className="text-orange-800">
              Update how many spots have been filled for each tier. Changes appear immediately on the homepage.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Title Sponsor */}
              <div>
                <Label htmlFor="title-filled" className="text-sm font-semibold text-orange-900">
                  Title Sponsor (1 total)
                </Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="title-filled"
                    type="number"
                    min="0"
                    max="1"
                    value={titleFilled}
                    onChange={(e) => setTitleFilled(Math.min(1, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">filled</span>
                </div>
              </div>

              {/* Signature Founding Partner */}
              <div>
                <Label htmlFor="signature-filled" className="text-sm font-semibold text-orange-900">
                  Signature Founding Partner (8 total)
                </Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="signature-filled"
                    type="number"
                    min="0"
                    max="8"
                    value={signatureFilled}
                    onChange={(e) => setSignatureFilled(Math.min(8, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">filled</span>
                </div>
              </div>

              {/* Founding Partner */}
              <div>
                <Label htmlFor="partner-filled" className="text-sm font-semibold text-orange-900">
                  Founding Partner (12 total)
                </Label>
                <div className="flex items-center gap-3 mt-2">
                  <Input
                    id="partner-filled"
                    type="number"
                    min="0"
                    max="12"
                    value={partnerFilled}
                    onChange={(e) => setPartnerFilled(Math.min(12, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600">filled</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={handleSaveSponsorshipCounts}
                className="bg-[#FF6200] hover:bg-[#FF6200]/90"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info Banner */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Analytics data is currently being collected in the browser console. 
              To see real data here, you'll need to integrate with Google Analytics or set up a custom analytics backend endpoint. 
              All tracking events are already implemented and logging successfully.
            </p>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.pageViews.total}</div>
              <p className="text-xs text-muted-foreground">
                {analyticsData.pageViews.today} today, {analyticsData.pageViews.thisWeek} this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(analyticsData.formSubmissions).reduce((a, b) => a + b, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                {analyticsData.formSubmissions["Founding Partner"]} founding partner inquiries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CTA Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Object.values(analyticsData.ctaClicks).reduce((a, b) => a + b, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Button and navigation clicks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
              <p className="text-xs text-muted-foreground">
                Bounce rate tracking active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scroll Depth */}
          <Card>
            <CardHeader>
              <CardTitle>Scroll Depth</CardTitle>
              <CardDescription>How far visitors scroll down the page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(analyticsData.scrollDepth).map(([depth, count]) => (
                  <div key={depth} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{depth}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#FF6200]" 
                          style={{ width: `${count > 0 ? (count / 100) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section Views */}
          <Card>
            <CardHeader>
              <CardTitle>Section Engagement</CardTitle>
              <CardDescription>Which sections visitors actually see</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(analyticsData.sectionViews).map(([section, count]) => (
                  <div key={section} className="flex items-center justify-between">
                    <span className="text-sm font-medium truncate">{section}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#0B2D59]" 
                          style={{ width: `${count > 0 ? (count / 100) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Performance */}
          <Card>
            <CardHeader>
              <CardTitle>CTA Performance</CardTitle>
              <CardDescription>Button and call-to-action clicks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(analyticsData.ctaClicks).map(([cta, count]) => (
                  <div key={cta} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{cta}</span>
                    <span className="text-lg font-bold text-[#FF6200]">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Form Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Form Analytics</CardTitle>
              <CardDescription>Form starts vs completions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Submissions</h4>
                  <div className="space-y-2">
                    {Object.entries(analyticsData.formSubmissions).map(([form, count]) => (
                      <div key={form} className="flex items-center justify-between">
                        <span className="text-sm">{form}</span>
                        <span className="text-sm font-bold">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <h4 className="text-sm font-semibold mb-2">Conversion Rate</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Founding Partner Form</span>
                      <span className="text-sm font-bold">
                        {analyticsData.formStarts["Founding Partner"] > 0
                          ? `${Math.round((analyticsData.formSubmissions["Founding Partner"] / analyticsData.formStarts["Founding Partner"]) * 100)}%`
                          : "--"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time on Page */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Time on Page Distribution</CardTitle>
            <CardDescription>How long visitors stay on the page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(analyticsData.timeOnPage).map(([range, count]) => (
                <div key={range} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#0B2D59]">{count}</div>
                  <div className="text-xs text-muted-foreground mt-1">{range}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
