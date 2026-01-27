

'use client';

import * as React from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { User, Mail, Phone, KeyRound, ArrowRight, ArrowLeft, Landmark, Banknote, Building2 } from 'lucide-react';
import { serviceCategories } from '@/lib/data';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { PlaceAutocomplete } from '@/components/places-autocomplete';
import { registerVendor } from '@/lib/actions';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const steps = [
  { id: 1, title: 'Basic Details', fields: ['fullName', 'phone', 'email', 'password'] },
  { id: 2, title: 'Service Details', fields: ['serviceCategory', 'experience'] },
  { id: 3, title: 'Location', fields: ['area', 'fullAddress', 'serviceRadius'] },
  { id: 4, title: 'Pricing', fields: ['pricingType', 'basePrice'] },
  { id: 5, title: 'KYC', fields: ['idProofType', 'idProofNumber'] },
  { id: 6, title: 'Bank Details', fields: ['accountHolderName', 'bankName', 'accountNumber', 'ifscCode'] },
  { id: 7, title: 'Agreement', fields: ['agreeTerms', 'allowLocation', 'confirmDetails'] },
];

const experienceLevels = [
    "0–1 year",
    "1–3 years",
    "3–5 years",
    "5+ years"
];

const kutchAreas = [
    "Bhuj", "Anjar", "Gandhidham", "Mundra", "Mandvi", "Rapar", "Nakhatrana"
];

const idProofTypes = [
    "Aadhaar Card", "Driving License", "Voter ID"
]

const vendorRegistrationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'A valid phone number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  serviceCategory: z.string().min(1, 'Service category is required'),
  subCategories: z.record(z.boolean()).optional(),
  experience: z.string().min(1, 'Experience is required'),
  area: z.string().min(1, 'Area is required'),
  fullAddress: z.string().min(10, 'Full address is required'),
  latitude: z.number(),
  longitude: z.number(),
  serviceRadius: z.array(z.number()),
  pricingType: z.enum(['fixed', 'hourly']),
  basePrice: z.string().min(1, 'Base price is required'),
  visitingCharge: z.string().optional(),
  idProofType: z.string().min(1, 'ID proof type is required'),
  idProofNumber: z.string().min(1, 'ID proof number is required'),
  accountHolderName: z.string().min(1, 'Account holder name is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  accountNumber: z.string().min(1, 'Account number is required'),
  ifscCode: z.string().min(1, 'IFSC code is required'),
  agreeTerms: z.boolean().refine(val => val === true, { message: 'You must agree to the terms.' }),
  allowLocation: z.boolean().refine(val => val === true, { message: 'You must allow location access.' }),
  confirmDetails: z.boolean().refine(val => val === true, { message: 'You must confirm your details.' }),
});


function VendorRegistrationForm() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [serverError, setServerError] = React.useState<{ message: string | null; errors?: any }>({ message: null });
  const router = useRouter();

  const { control, watch, setValue, handleSubmit, trigger, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(vendorRegistrationSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      serviceCategory: '',
      subCategories: {},
      experience: '',
      area: '',
      fullAddress: '',
      latitude: 23.25,
      longitude: 69.66,
      serviceRadius: [10],
      pricingType: 'fixed' as 'fixed' | 'hourly',
      basePrice: '',
      visitingCharge: '',
      idProofType: '',
      idProofNumber: '',
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      agreeTerms: false,
      allowLocation: false,
      confirmDetails: false
    }
  });


  const selectedCategory = watch('serviceCategory');

  const subCategories = React.useMemo(() => {
    const category = serviceCategories.find(c => c.id === selectedCategory);
    return category ? category.subCategories : [];
  }, [selectedCategory]);

  const [selectedLocation, setSelectedLocation] = React.useState<{lat: number; lng: number} | null>({lat: 23.25, lng: 69.66});
  const map = useMap();

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place?.geometry?.location && map) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const newLocation = { lat, lng };

      setSelectedLocation(newLocation);
      setValue('fullAddress', place.formatted_address || '', { shouldValidate: true });
      setValue('latitude', lat);
      setValue('longitude', lng);
      
      map.panTo(newLocation);
      map.setZoom(15);
    }
  };

  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;
  
  const onFormSubmit = async (data: FieldValues) => {
    setServerError({ message: null, errors: {} });
    const result = await registerVendor(null, data);
    if (result?.errors || result?.message) {
      setServerError({ message: result.message, errors: result.errors });
    } else {
        router.push('/');
    }
  };

  const handleNext = async () => {
    const fields = steps[currentStep - 1].fields as (keyof FieldValues)[];
    const isValid = await trigger(fields);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Combine local and server errors
  const formErrors: FieldValues = { ...errors, ...serverError?.errors };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Vendor Registration</CardTitle>
          <CardDescription>
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="min-h-[350px]">
          {currentStep === 1 && (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="fullName" placeholder="Enter your full name" className="pl-10" />
                            </div>
                        )}
                    />
                    {formErrors.fullName && <p className="text-sm font-medium text-destructive">{formErrors.fullName.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Mobile Number</Label>
                     <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="phone" type="tel" placeholder="Enter your mobile number" className="pl-10" />
                            </div>
                        )}
                     />
                      {formErrors.phone && <p className="text-sm font-medium text-destructive">{formErrors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email ID</Label>
                     <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="email" type="email" placeholder="name@example.com" className="pl-10" />
                            </div>
                         )}
                     />
                     {formErrors.email && <p className="text-sm font-medium text-destructive">{formErrors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Set Password</Label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="password" type="password" placeholder="Choose a strong password" className="pl-10" />
                            </div>
                        )}
                    />
                     {formErrors.password && <p className="text-sm font-medium text-destructive">{formErrors.password.message}</p>}
                </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="service-category">Service Category</Label>
                    <Controller
                        name="serviceCategory"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger id="service-category">
                                    <SelectValue placeholder="Select the main category of your service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {serviceCategories.map(category => (
                                        <SelectItem key={category.id} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                     {formErrors.serviceCategory && <p className="text-sm font-medium text-destructive">{formErrors.serviceCategory.message}</p>}
                </div>

                {subCategories.length > 0 && (
                    <div className="space-y-3">
                        <Label>Service(s) Offered</Label>
                         <Controller
                            name="subCategories"
                            control={control}
                            render={({ field }) => (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-lg border p-4 max-h-48 overflow-y-auto">
                                    {subCategories.map(sub => (
                                        <div key={sub.id} className="flex items-center gap-2">
                                            <Checkbox 
                                                id={`sub-${sub.id}`} 
                                                checked={field.value ? field.value[sub.id] || false : false}
                                                onCheckedChange={(checked) => {
                                                    const newValue = {...field.value};
                                                    if (checked) {
                                                        newValue[sub.id] = true;
                                                    } else {
                                                        delete newValue[sub.id];
                                                    }
                                                    field.onChange(newValue);
                                                }}
                                            />
                                            <Label htmlFor={`sub-${sub.id}`} className="font-normal cursor-pointer">{sub.name}</Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                )}
                
                <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                     <Controller
                        name="experience"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger id="experience">
                                    <SelectValue placeholder="Select your years of experience" />
                                </SelectTrigger>
                                <SelectContent>
                                    {experienceLevels.map(level => (
                                        <SelectItem key={level} value={level}>
                                            {level}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                     {formErrors.experience && <p className="text-sm font-medium text-destructive">{formErrors.experience.message}</p>}
                </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" value="Kutchh, Gujarat" disabled />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="area">Area / Locality</Label>
                        <Controller
                            name="area"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger id="area">
                                        <SelectValue placeholder="Select your primary area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kutchAreas.map(area => (
                                            <SelectItem key={area} value={area}>
                                                {area}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                         {formErrors.area && <p className="text-sm font-medium text-destructive">{formErrors.area.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fullAddress">Search and Pin your Full Address</Label>
                    <Controller
                        name="fullAddress"
                        control={control}
                        render={({ field }) => (
                            <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} defaultValue={field.value} />
                        )}
                     />
                      {formErrors.fullAddress && <p className="text-sm font-medium text-destructive">{formErrors.fullAddress.message}</p>}
                </div>

                <div className="h-48 w-full rounded-md border bg-muted overflow-hidden">
                    <Map 
                        defaultCenter={selectedLocation || undefined} 
                        defaultZoom={9} 
                        mapId="vendor-reg-map"
                        gestureHandling='greedy'
                        disableDefaultUI
                    >
                         {selectedLocation && <AdvancedMarker position={selectedLocation} />}
                    </Map>
                </div>
                <div className="space-y-4">
                     <Controller
                        name="serviceRadius"
                        control={control}
                        defaultValue={[10]}
                        render={({ field }) => (
                            <>
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="working-radius">Service Radius</Label>
                                    <span className="text-sm font-medium text-primary">{field.value[0]} km</span>
                                </div>
                                <Slider
                                    id="working-radius"
                                    min={1}
                                    max={50}
                                    step={1}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                />
                            </>
                        )}
                    />
                </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Pricing Type</Label>
                    <Controller
                        name="pricingType"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="fixed" id="fixed" />
                                    <Label htmlFor="fixed">Fixed Price</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="hourly" id="hourly" />
                                    <Label htmlFor="hourly">Per Hour</Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="base-price">Base Price (₹)</Label>
                        <Controller
                            name="basePrice"
                            control={control}
                            render={({ field }) => <Input {...field} id="base-price" type="number" placeholder="e.g., 500" />}
                        />
                        {formErrors.basePrice && <p className="text-sm font-medium text-destructive">{formErrors.basePrice.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="visiting-charge">Visiting Charge (₹) (Optional)</Label>
                        <Controller
                            name="visitingCharge"
                            control={control}
                            render={({ field }) => <Input {...field} id="visiting-charge" type="number" placeholder="e.g., 150" />}
                        />
                    </div>
                </div>
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="id-proof-type">ID Proof Type</Label>
                    <Controller
                        name="idProofType"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger id="id-proof-type">
                                    <SelectValue placeholder="Select ID type" />
                                </SelectTrigger>
                                <SelectContent>
                                {idProofTypes.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                     {formErrors.idProofType && <p className="text-sm font-medium text-destructive">{formErrors.idProofType.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="id-proof-number">ID Proof Number</Label>
                    <Controller
                        name="idProofNumber"
                        control={control}
                        render={({ field }) => <Input {...field} id="id-proof-number" placeholder="Enter ID number" />}
                    />
                    {formErrors.idProofNumber && <p className="text-sm font-medium text-destructive">{formErrors.idProofNumber.message}</p>}
                </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
                <CardTitle className="text-xl">Bank Details</CardTitle>
                <div className="space-y-2">
                    <Label htmlFor="account-holder">Account Holder Name</Label>
                    <Controller
                        name="accountHolderName"
                        control={control}
                        render={({ field }) => (
                           <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="account-holder" placeholder="Enter name as per bank records" className="pl-10" />
                            </div>
                        )}
                    />
                    {formErrors.accountHolderName && <p className="text-sm font-medium text-destructive">{formErrors.accountHolderName.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="bank-name">Bank Name</Label>
                    <Controller
                        name="bankName"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="bank-name" placeholder="Enter your bank's name" className="pl-10" />
                            </div>
                        )}
                    />
                     {formErrors.bankName && <p className="text-sm font-medium text-destructive">{formErrors.bankName.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="account-number">Account Number</Label>
                     <Controller
                        name="accountNumber"
                        control={control}
                        render={({ field }) => (
                            <div className="relative">
                                <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="account-number" placeholder="Enter your bank account number" className="pl-10" />
                            </div>
                        )}
                    />
                    {formErrors.accountNumber && <p className="text-sm font-medium text-destructive">{formErrors.accountNumber.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ifsc-code">IFSC Code</Label>
                     <Controller
                        name="ifscCode"
                        control={control}
                        render={({ field }) => (
                           <div className="relative">
                                <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input {...field} id="ifsc-code" placeholder="Enter your bank's IFSC code" className="pl-10" />
                            </div>
                        )}
                    />
                     {formErrors.ifscCode && <p className="text-sm font-medium text-destructive">{formErrors.ifscCode.message}</p>}
                </div>
            </div>
          )}

        {currentStep === 7 && (
            <div className="space-y-6">
                <CardTitle className="text-xl">Agreement</CardTitle>
                 <div className="flex items-start space-x-3">
                    <Controller
                        name="agreeTerms"
                        control={control}
                        render={({ field }) => (
                            <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} name={field.name}/>
                        )}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="terms" className="cursor-pointer">I agree to the Terms & Conditions and Privacy Policy.</Label>
                        {formErrors.agreeTerms && <p className="text-sm font-medium text-destructive">{formErrors.agreeTerms.message}</p>}
                    </div>
                </div>
                 <div className="flex items-start space-x-3">
                     <Controller
                        name="allowLocation"
                        control={control}
                        render={({ field }) => (
                           <Checkbox id="location" checked={field.value} onCheckedChange={field.onChange} name={field.name} />
                        )}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="location" className="cursor-pointer">I allow Jalaram Home Service to access my location to suggest relevant jobs.</Label>
                         {formErrors.allowLocation && <p className="text-sm font-medium text-destructive">{formErrors.allowLocation.message}</p>}
                    </div>
                </div>
                 <div className="flex items-start space-x-3">
                     <Controller
                        name="confirmDetails"
                        control={control}
                        render={({ field }) => (
                            <Checkbox id="details" checked={field.value} onCheckedChange={field.onChange} name={field.name} />
                        )}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="details" className="cursor-pointer">I confirm that all the details provided by me are correct.</Label>
                         {formErrors.confirmDetails && <p className="text-sm font-medium text-destructive">{formErrors.confirmDetails.message}</p>}
                    </div>
                </div>
            </div>
        )}
        
        {serverError?.message && (
             <Alert variant={serverError.errors ? 'destructive' : 'default'} className="mt-4">
                <AlertTitle>{serverError.errors ? 'Error' : 'Status'}</AlertTitle>
                <AlertDescription>{serverError.message}</AlertDescription>
            </Alert>
        )}


        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {currentStep === totalSteps ? (
             <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit for Approval'}
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
      </form>
  )
}


export default function VendorRegistrationPage() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
             <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <p className="text-muted-foreground">Map requires API Key.</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
           <APIProvider apiKey={apiKey} libraries={['places']}>
                <VendorRegistrationForm />
           </APIProvider>
        </div>
    );
}
