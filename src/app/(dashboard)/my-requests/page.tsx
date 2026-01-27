
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { jobRequests, vendors } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MyRequestsPage() {
  // In a real app, you would filter requests for the logged-in customer
  const myJobRequests = jobRequests.slice(0, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Service Requests</CardTitle>
        <CardDescription>
          View the status of all your current and past service requests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Vendor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myJobRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="font-medium">{request.serviceCategory}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-xs">
                    {request.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === 'completed'
                        ? 'secondary'
                        : request.status === 'pending'
                        ? 'default'
                        : 'outline'
                    }
                    className={
                      request.status === 'assigned'
                        ? 'bg-blue-100 text-blue-800'
                        : request.status === 'in-progress'
                        ? 'bg-amber-100 text-amber-800'
                        : ''
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.vendorId
                    ? vendors.find((v) => v.id === request.vendorId)?.name
                    : 'Awaiting assignment'}
                </TableCell>
                <TableCell>
                  {request.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Link href={`/my-requests/${request.id}`}>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
