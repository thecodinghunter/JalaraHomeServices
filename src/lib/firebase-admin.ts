
import * as admin from 'firebase-admin';

export async function initFirebaseAdmin() {
  if (!admin.apps.length) {
    // Check if the service account JSON is available in the environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      // Fallback for local development without service account key (e.g., using emulators)
      // This will use the default credentials if available (e.g., GOOGLE_APPLICATION_CREDENTIALS)
      admin.initializeApp();
    }
  }
}
