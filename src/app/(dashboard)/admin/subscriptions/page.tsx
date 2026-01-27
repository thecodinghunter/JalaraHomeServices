import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/lib/data";
import { PlusCircle, Calendar, Tag, BadgeDollarSign } from "lucide-react";

export default function AdminSubscriptionsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>
                Create and manage subscription tiers for vendors.
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{plan.name} Plan</span>
                    <Tag className="h-6 w-6 text-primary" />
                  </CardTitle>
                  <div className="flex items-baseline gap-1 pt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-sm text-muted-foreground">/{plan.name.toLowerCase()}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <BadgeDollarSign className="h-5 w-5 text-muted-foreground" />
                    <span>Access to all job requests</span>
                  </div>
                   <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Billed per {plan.durationDays} day(s)</span>
                  </div>
                </CardContent>
                <CardContent>
                   <Button variant="outline" className="w-full">
                    Manage Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
