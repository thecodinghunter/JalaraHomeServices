'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HandPlatter, Building } from 'lucide-react';
import Link from 'next/link';

// Mock data, in a real app this would come from your backend
const customerStats = {
  activeRequests: 1,
  totalRequests: 5,
};

export default function CustomerDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.activeRequests}</div>
            <p className="text-xs text-muted-foreground">
              Service requests currently in progress.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <HandPlatter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              All service requests you've made.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Need a Hand?</CardTitle>
          <CardDescription>
            From leaky faucets to electrical repairs, we've got you covered.
            Request a service now.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/request-service">
            <Button size="lg" className="w-full sm:w-auto">
              <HandPlatter className="mr-2 h-5 w-5" />
              Request a New Service
            </Button>
          </Link>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Track Your Requests</CardTitle>
          <CardDescription>
            View the status of your ongoing and past service requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Link href="/my-requests">
            <Button variant="outline" className="w-full sm:w-auto">
                <Building className="mr-2 h-5 w-5" />
                Go to My Requests
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
