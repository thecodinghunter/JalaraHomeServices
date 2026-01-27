
'use client';

import { Suspense } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { findVendor } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader, AlertCircle, ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Confirming Request...
        </>
      ) : (
        'Confirm & Find Vendor'
      )}
    </Button>
  );
}

function ServiceDetailsContent() {
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('category');
  const serviceSubCategory = searchParams.get('subcategory');
  const serviceCategory = searchParams.get('categoryName');
  const location = searchParams.get('location');

  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(findVendor, initialState);

  const backLink = `/request-service/location?${searchParams.toString()}`;

  if (!serviceSubCategory || !serviceCategory || !location) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold">Missing Information</h2>
        <p className="text-muted-foreground mt-2">
          Some details from the previous steps are missing. Please go back.
        </p>
        <Link href="/request-service">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Start Over
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh_-_theme(spacing.32))] p-4">
      <form action={dispatch} className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Link href={backLink}>
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <CardTitle>Confirm Your Request</CardTitle>
                <CardDescription>
                  Provide final details for the{' '}
                  <span className="font-semibold text-primary">
                    {decodeURIComponent(serviceSubCategory)}
                  </span>{' '}
                  service.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <input type="hidden" name="serviceSubCategory" value={decodeURIComponent(serviceSubCategory)} />
            <input type="hidden" name="serviceCategory" value={decodeURIComponent(serviceCategory)} />
            <input type="hidden" name="customerLocation" value={location} />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Thakkar Yash Manoj Kumar" required />
                  {state?.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">10-digit mobile number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="9106433706" required />
                  {state?.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                </div>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input id="pincode" name="pincode" placeholder="370001" required />
                  {state?.errors?.pincode && <p className="text-sm font-medium text-destructive">{state.errors.pincode[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locality">Locality</Label>
                  <Input id="locality" name="locality" placeholder="bhuj" required />
                   {state?.errors?.locality && <p className="text-sm font-medium text-destructive">{state.errors.locality[0]}</p>}
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address (Area and Street)</Label>
              <Textarea id="address" name="address" placeholder="opp. jalaram temple new raghuvanshi nager behind the bhanushali nager" required />
              {state?.errors?.address && <p className="text-sm font-medium text-destructive">{state.errors.address[0]}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City/District/Town</Label>
                  <Input id="city" name="city" placeholder="BHUJ" required />
                  {state?.errors?.city && <p className="text-sm font-medium text-destructive">{state.errors.city[0]}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" name="state" placeholder="Gujarat" required />
                  {state?.errors?.state && <p className="text-sm font-medium text-destructive">{state.errors.state[0]}</p>}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input id="landmark" name="landmark" placeholder="e.g. Near City Park" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                  <Input id="alternatePhone" name="alternatePhone" type="tel" placeholder="Alternate contact number" />
                </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="issueDescription">Describe the Issue</Label>
              <Textarea
                id="issueDescription"
                name="issueDescription"
                placeholder="e.g., The kitchen sink pipe is leaking constantly."
                required
              />
              {state?.errors?.issueDescription && (
                <p className="text-sm font-medium text-destructive">
                  {state.errors.issueDescription[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4">
            <SubmitButton />
            {state?.message && (
                <Alert variant={state.errors ? 'destructive' : 'default'}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{state.errors ? 'Error' : 'Status'}</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default function RequestDetailsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full min-h-screen"><Loader className="w-8 h-8 animate-spin" /></div>}>
            <ServiceDetailsContent />
        </Suspense>
    )
}
