
'use server';

/**
 * @fileOverview A vendor recommendation AI agent.
 *
 * - recommendVendor - A function that handles the vendor recommendation process.
 * - RecommendVendorInput - The input type for the recommendVendor function.
 * - RecommendVendorOutput - The return type for the recommendVendor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendVendorInputSchema = z.object({
  jobDescription: z.string().describe('A detailed description of the job, including address and specific issue.'),
  serviceCategory: z.string().describe('The specific sub-category of service required for the job (e.g., "Plumber", "AC Repair").'),
  customerLocation: z.string().describe('The latitude and longitude of the customer requesting the service (e.g., "23.7337, 69.8597").'),
  availableVendors: z.array(
    z.object({
      vendorId: z.string().describe('The unique identifier of the vendor.'),
      location: z.string().describe('The current location of the vendor.'),
      serviceCategory: z.string().describe('The service category the vendor is qualified for.'),
      rating: z.number().describe('The average rating of the vendor (0-5).'),
      currentWorkload: z.number().describe('The number of jobs the vendor is currently handling.'),
      subscriptionStatus: z
        .string()
        .describe('The subscription status of the vendor (active/inactive).'),
      isOnline: z.boolean().describe('Whether the vendor is currently online.'),
    })
  ).describe('A list of available vendors with their details.'),
});
export type RecommendVendorInput = z.infer<typeof RecommendVendorInputSchema>;

const RecommendVendorOutputSchema = z.object({
  recommendedVendorId: z.string().describe('The vendor ID of the recommended vendor.'),
  reason: z.string().describe('The reason for recommending the vendor.'),
});
export type RecommendVendorOutput = z.infer<typeof RecommendVendorOutputSchema>;

export async function recommendVendor(input: RecommendVendorInput): Promise<RecommendVendorOutput> {
  return recommendVendorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendVendorPrompt',
  input: {schema: RecommendVendorInputSchema},
  output: {schema: RecommendVendorOutputSchema},
  prompt: `You are an expert in vendor management and job assignment. Your task is to recommend the most suitable vendor for a given job request based on the following factors:

- Proximity to the customer
- Service category match
- Vendor rating
- Current workload
- Subscription status
- Online status

Job Description: {{{jobDescription}}}
Service Category: {{{serviceCategory}}}
Customer Location: {{{customerLocation}}}

Available Vendors:
{{#each availableVendors}}
Vendor ID: {{{vendorId}}}, Location: {{{location}}}, Service Category: {{{serviceCategory}}}, Rating: {{{rating}}}, Workload: {{{currentWorkload}}}, Subscription: {{{subscriptionStatus}}}, Online: {{{isOnline}}}
{{/each}}

Given the above information, please select the best vendor for the job and explain your reasoning. Only recommend vendors with an active subscription and are currently online.

Ensure that the output is in the following JSON format:
{
  "recommendedVendorId": "",
  "reason": ""
}
`,
});

const recommendVendorFlow = ai.defineFlow(
  {
    name: 'recommendVendorFlow',
    inputSchema: RecommendVendorInputSchema,
    outputSchema: RecommendVendorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
