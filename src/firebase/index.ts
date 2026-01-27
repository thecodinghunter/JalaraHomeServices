'use client';
import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp,
} from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '@/firebase/config';

// Re-export the provider and hooks
export {
  FirebaseProvider,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from '@/firebase/provider';
export { FirebaseClientProvider } from '@/firebase/client-provider';
export { useCollection } from '@/firebase/firestore/use-collection';
export { useDoc } from '@/firebase/firestore/use-doc';
export { useUser } from '@/firebase/auth/use-user';
export { firebaseConfig };

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

export function initializeFirebase(
  config: FirebaseOptions = firebaseConfig
): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  if (getApps().length === 0) {
    app = initializeApp(config);
    auth = getAuth(app);
    firestore = getFirestore(app);
  } else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
  return { app, auth, firestore };
}

initializeFirebase();

export { app, auth, firestore };
