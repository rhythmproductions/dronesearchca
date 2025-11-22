import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (password === "1111") {
      // Store admin session
      sessionStorage.setItem("admin_authenticated", "true");
      toast.success("✓ Login successful");
      setLocation("/admin/dashboard");
    } else {
      toast.error("Incorrect password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter the admin password to access the analytics dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
            <Button type="submit" className="w-full bg-[#0B2D59] hover:bg-[#0B2D59]/90">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
