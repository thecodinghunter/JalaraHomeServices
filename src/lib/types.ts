

export type UserRole = 'admin' | 'vendor' | 'customer';

export type SubscriptionStatus = 'active' | 'inactive' | 'expired';

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  role: UserRole;
}

export type Vendor = {
  id: string;
  name: string;
  phone: string;
  location: string;
  serviceCategory: string;
  rating: number;
  currentWorkload: number;
  subscriptionStatus: SubscriptionStatus;
  isOnline: boolean;
  workingRadius: number; // in kilometers
  approved: boolean;
};

export type SubCategory = {
  id: string;
  name: string;
  name_gu?: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  name_gu?: string;
  description: string;
  subCategories: SubCategory[];
  imageHint: string;
};

export type SubscriptionPlan = {
  id: string;
  name: 'Daily' | 'Weekly' | 'Monthly';
  price: number;
  durationDays: number;
};

export type GeoLocation = {
    latitude: number;
    longitude: number;
}

export type JobRequest = {
  id:string;
  customerId?: string; // made optional for mock data
  serviceCategory: string;
  description: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  customerLocation: GeoLocation;
  createdAt: Date;
  vendorId?: string;

  // Detailed address fields
  name: string;
  phone: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  alternatePhone?: string;
};
