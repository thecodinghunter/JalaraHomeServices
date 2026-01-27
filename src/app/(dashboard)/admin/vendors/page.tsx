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
import { Button } from "@/components/ui/button";
import { vendors } from "@/lib/data";
import { CheckCircle, XCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function AdminVendorsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Management</CardTitle>
        <CardDescription>
          Approve, manage, and view all vendors on the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Service Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>Online</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <div className="font-medium">{vendor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {vendor.phone}
                  </div>
                </TableCell>
                <TableCell>{vendor.serviceCategory}</TableCell>
                <TableCell>
                  <Badge 
                    variant={vendor.subscriptionStatus === 'active' ? 'default' : 'destructive'}
                    className={`${vendor.subscriptionStatus === 'active' ? 'bg-green-100 text-green-800' : ''}`}
                  >
                    {vendor.subscriptionStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={vendor.approved ? 'secondary' : 'outline'}>
                    {vendor.approved ? (
                      <span className="flex items-center gap-1 text-green-700"><CheckCircle className="h-3 w-3" /> Approved</span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-700"><XCircle className="h-3 w-3" /> Pending</span>
                    )}
                  </Badge>
                </TableCell>
                <TableCell>
                   <div className={`flex items-center gap-2 ${vendor.isOnline ? 'text-green-600' : 'text-muted-foreground'}`}>
                        <span className={`h-2 w-2 rounded-full ${vendor.isOnline ? 'bg-green-600' : 'bg-gray-400'}`} />
                        {vendor.isOnline ? 'Online' : 'Offline'}
                    </div>
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {!vendor.approved && <DropdownMenuItem>Approve</DropdownMenuItem>}
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Suspend</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
