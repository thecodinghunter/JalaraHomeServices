import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { subscriptionPlans, vendors } from "@/lib/data";
import { CheckCircle, XCircle, Tag } from "lucide-react";

const currentVendor = vendors[0];

export default function VendorSubscriptionPage() {
  return (
    <div className="grid gap-8">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle>Your Current Subscription</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              {currentVendor.subscriptionStatus === 'active' ? 'Active Plan' : 'Inactive'}
            </Badge>
            <p className="text-lg font-medium">
              {currentVendor.subscriptionStatus === 'active' ? 'Weekly Plan' : 'No active plan'}
            </p>
            <p className="text-primary-foreground/80 text-sm">
              {currentVendor.subscriptionStatus === 'active' ? 'Expires on: December 31, 2024' : 'Subscribe to start receiving jobs.'}
            </p>
          </div>
          {currentVendor.subscriptionStatus === 'active' ? (
             <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">Renew Plan</Button>
          ) : (
            <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">Choose a Plan</Button>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Choose a New Plan</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className="flex flex-col hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name} Plan</span>
                  <Tag className="h-6 w-6 text-muted-foreground" />
                </CardTitle>
                <div className="flex items-baseline gap-1 pt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.name.toLowerCase()}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-muted-foreground text-sm">
                    Ideal for {plan.name === 'Daily' ? 'part-time' : plan.name === 'Weekly' ? 'regular' : 'full-time'} vendors.
                </p>
                <div className="flex items-start gap-3 text-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Access to all job requests for {plan.durationDays} day{plan.durationDays > 1 ? 's' : ''}.</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                   <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span>Priority support</span>
                </div>
                 <div className="flex items-start gap-3 text-sm">
                   {plan.name !== 'Daily' ? <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" /> : <XCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />}
                  <span>Advanced analytics</span>
                </div>
              </CardContent>
              <CardContent>
                  <Button className="w-full">
                    Subscribe to {plan.name}
                  </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
