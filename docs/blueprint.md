# **App Name**: Jalaram home service

## Core Features:

- User Authentication: Firebase Phone OTP authentication for users to verify their phone numbers.
- Vendor Subscription Management: Vendors subscribe to a fixed-fee plan (daily/weekly/monthly) for access to the platform. Subscription status is tracked in Firestore.
- Automated Vendor Offline Status: Cloud Function to automatically set vendors offline upon subscription expiry, preventing job assignments. Daily job history
- Real-time Job Request Assignment: System finds the nearest online vendor with an active subscription based on service category and sends a job request via Firestore. Includes a tool to assess all information regarding available vendors to assign to the proper job.
- Google Maps Integration: Navigation to customer locations.
- Vendor Profile Management: Vendors can manage their profile, including service category, working radius, and online/offline status. Subscription status will also be reflected.
- Admin Vendor Management: Admin panel to approve/reject vendors, create service categories, and manage subscription plans.

## Style Guidelines:

- Primary color: #5061FF (a vibrant blue-purple) to convey professionalism and innovation.
- Background color: #F2F4FF (very light desaturated blue-purple) for a clean and modern feel.
- Accent color: #FF6B50 (a bright orange) to draw attention to calls to action and important notifications.
- Body and headline font: 'Inter' for a clean, modern, readable sans-serif experience.
- Use consistent, minimalist icons to represent service categories and actions.
- Employ a clean and intuitive layout with clear visual hierarchy.
- Subtle animations to indicate loading states and successful interactions.