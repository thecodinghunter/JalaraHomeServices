

"use server";

import { z } from "zod";
import { recommendVendor } from "@/ai/flows/vendor-recommendation";
import { vendors as allVendors } from "@/lib/data";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from "@/supabase/server";

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
  issueImageUrl: z.string().url().optional().or(z.literal('')),
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
  
  const { serviceSubCategory, serviceCategory, customerLocation, address, city, locality, name, phone, pincode, state, landmark, alternatePhone, issueDescription, issueImageUrl } = validatedFields.data;
  
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
    
    const supabase = getSupabaseServerClient();

    const { error: insertError } = await supabase.from('job_requests').insert({
      customer_name: name,
      customer_phone: phone,
      alternate_phone: alternatePhone || null,
      service_category: serviceCategory,
      service_sub_category: serviceSubCategory,
      customer_location: customerLocation,
      pincode,
      locality,
      address,
      city,
      state,
      landmark: landmark || null,
      issue_description: issueDescription,
      issue_image_url: issueImageUrl || null,
      status: 'assigned',
      assigned_vendor_id: recommendedVendorDetails?.id || null,
    });

    if (insertError) {
      throw insertError;
    }


  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while finding a vendor. Please try again.",
    };
  }

  revalidatePath('/my-requests');
  redirect('/my-requests');
}
