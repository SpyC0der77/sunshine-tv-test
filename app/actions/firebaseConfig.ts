interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  }
  
  function getFirebaseConfig(): FirebaseConfig {
    const {
      NEXT_PUBLIC_FIREBASE_API_KEY,
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      NEXT_PUBLIC_FIREBASE_APP_ID,
    } = process.env;
  
    if (
      !NEXT_PUBLIC_FIREBASE_API_KEY ||
      !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      !NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      !NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
      !NEXT_PUBLIC_FIREBASE_APP_ID
    ) {
      throw new Error("Missing one or more Firebase configuration environment variables.");
    }
  
    return {
      apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: NEXT_PUBLIC_FIREBASE_APP_ID,
    };
  }
  
  export const firebaseConfig = getFirebaseConfig();
  