

"use server";

import { z } from "zod";
import { recommendVendor } from "@/ai/flows/vendor-recommendation";
import { vendors as allVendors } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initFirebaseAdmin } from "./firebase-admin";

const requestServiceSchema = z.object({
  serviceSubCategory: z.string().min(1, "Service sub-category is required."),
  serviceCategory: z.string().min(1, "Service category is required."),
  customerLocation: z.string().min(1, "Location is required."),
  name: z.string().min(1, "Name is required."),
  phone: z.string().min(10, "A valid phone number is required."),
  pincode: z.string().min(6, "A valid pincode is required."),
  locality: z.string().min(3, "Locality is required."),
  address: z.string().min(10, "Please provide a more detailed address."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  landmark: z.string().optional(),
  alternatePhone: z.string().optional(),
  issueDescription: z.string().min(10, "Please describe the issue in more detail."),
});

export async function findVendor(prevState: any, formData: FormData) {
  const validatedFields = requestServiceSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: "Invalid form data. Please check all fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { serviceSubCategory, customerLocation, address, city, locality, name, pincode, state, landmark, issueDescription } = validatedFields.data;
  
  const detailedAddress = `${name}, ${address}, ${locality}, ${city}, ${state} - ${pincode}. Landmark: ${landmark || 'N/A'}`;
  const jobDescription = `Address: ${detailedAddress}. Issue: ${issueDescription}`;

  try {
    const availableVendors = allVendors.map(vendor => ({
        vendorId: vendor.id,
        location: vendor.location,
        serviceCategory: vendor.serviceCategory,
        rating: vendor.rating,
        currentWorkload: vendor.currentWorkload,
        subscriptionStatus: vendor.subscriptionStatus,
        isOnline: vendor.isOnline
    }));

    const result = await recommendVendor({
      jobDescription,
      serviceCategory: serviceSubCategory, // Use the specific sub-category for matching
      customerLocation,
      availableVendors,
    });
    
    const recommendedVendorDetails = allVendors.find(v => v.id === result.recommendedVendorId);
    
    // Here you would save the job request to the database
    console.log("Found vendor:", recommendedVendorDetails);
    console.log("Job Details:", { ...validatedFields.data });


  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while finding a vendor. Please try again.",
    };
  }

  revalidatePath('/my-requests');
  redirect('/my-requests');
}


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


export async function registerVendor(data: unknown) {
  
  const validatedFields = vendorRegistrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: "Invalid form data. Please check all fields.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, fullName, phone, subCategories, ...vendorProfileData } = validatedFields.data;

  try {
    await initFirebaseAdmin();
    const auth = getAuth(getApp());
    const firestore = getFirestore(getApp());

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
      phoneNumber: phone,
      emailVerified: false,
    });

    const processedSubCategories = subCategories ? Object.keys(subCategories).filter(key => subCategories[key]) : [];

    const vendorProfile = {
      uid: userRecord.uid,
      email: email,
      displayName: fullName,
      phoneNumber: phone,
      role: 'vendor',
      status: 'pending', // 'pending', 'approved', 'suspended'
      ...vendorProfileData,
      subCategories: processedSubCategories,
    };

    await firestore.collection('users').doc(userRecord.uid).set(vendorProfile);

  } catch (error: any) {
    console.error("Vendor Registration Error:", error);
    let message = "An unexpected error occurred during registration.";
    if (error.code === 'auth/email-already-exists') {
        message = "This email is already registered. Please use a different email.";
    }
    return {
      message,
    };
  }
  
  redirect('/');
}
