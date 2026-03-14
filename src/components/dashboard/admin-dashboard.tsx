import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { jobRequests, vendors } from "@/lib/data";
import { Activity, Users, CreditCard, Wrench } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 active this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter((v) => v.subscriptionStatus === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              +1 since last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {jobRequests.filter((j) => j.status === "in-progress" || j.status === "assigned").length}
            </div>
            <p className="text-xs text-muted-foreground">
              +3 new jobs today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Online Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.filter((v) => v.isOnline).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ready to take jobs
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Job Requests</CardTitle>
          <CardDescription>
            An overview of the latest service requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Vendor</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobRequests.slice(0, 5).map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="font-medium">{request.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {request.customerLocation.latitude.toFixed(4)}, {request.customerLocation.longitude.toFixed(4)}
                    </div>
                  </TableCell>
                  <TableCell>{request.serviceCategory}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={request.status === 'completed' ? 'secondary' : request.status === 'pending' ? 'default' : 'outline'}
                      className={request.status === 'assigned' ? 'bg-blue-100 text-blue-800' : ''}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {request.vendorId
                      ? vendors.find((v) => v.id === request.vendorId)?.name
                      : "Unassigned"}
                  </TableCell>
                  <TableCell>
                    {request.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
