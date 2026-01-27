import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Star, Wrench, Zap } from "lucide-react";
import Link from "next/link";

// Mock data, in a real app this would come from your backend
const vendorStats = {
  activeJobs: 3,
  pendingJobs: 5,
  rating: 4.8,
  isOnline: true,
};

export default function VendorDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Job Requests
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.pendingJobs}</div>
             <p className="text-xs text-muted-foreground">
              Waiting for your acceptance
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendorStats.rating}</div>
             <p className="text-xs text-muted-foreground">
              Based on customer reviews
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${vendorStats.isOnline ? 'text-green-600' : 'text-muted-foreground'}`}>
              {vendorStats.isOnline ? "Online" : "Offline"}
            </div>
             <p className="text-xs text-muted-foreground">
              {vendorStats.isOnline ? "You are receiving job requests" : "You are not receiving jobs"}
            </p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Ready to Work?</CardTitle>
          <CardDescription>
            Check out the latest job requests that match your skills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-6 bg-muted rounded-lg">
                <div>
                    <h3 className="text-lg font-semibold">5 new jobs available</h3>
                    <p className="text-muted-foreground text-sm">Including a high-priority plumbing issue nearby.</p>
                </div>
                <Link href="/vendor/jobs">
                    <Button>View Jobs</Button>
                </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
