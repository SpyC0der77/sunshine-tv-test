"use server";

import { revalidatePath } from "next/cache";
import app from "./firebaseClient";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

// Define the TypeScript interface for a TV document.
export interface TvDocument {
  channel: string;
  creator: string;
  // 'date' is stored as a map with seconds and nanoseconds.
  date: { seconds: number; nanoseconds: number };
  impressions: number;
  likers: unknown[]; // Adjust the type if you know the shape of the array items.
  name: string;
  title: string;
  uid: string;
  url: string;
  views: number;
  viewsJSON: unknown[]; // Adjust the type as needed.
  visibleDate: string;
  watchers: string[];
}

// Initialize Firestore.
const firestore = getFirestore(app);

/**
 * Retrieves a single TV document from Firestore by its ID.
 *
 * @param id - The document ID to retrieve.
 * @returns The TV document or null if not found.
 */
export async function getTvById(id: string): Promise<TvDocument | null> {
  const docRef = doc(firestore, "tv", id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data() as TvDocument;
  }
  return null;
}

/**
 * Retrieves all TV documents from the "tv" collection.
 *
 * @returns An array of TV documents.
 */
export async function getAllTvDocuments(): Promise<TvDocument[]> {
  const colRef = collection(firestore, "tv");
  const snapshot = await getDocs(colRef);
  const documents: TvDocument[] = [];
  snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    documents.push(doc.data() as TvDocument);
  });
  return documents;
}

/**
 * (Optional) Retrieves TV documents sorted by their date field.
 * Adjust the field path as needed if you store the date differently.
 *
 * @returns An array of TV documents sorted by date in descending order.
 */
export async function getTvDocumentsSortedByDate(): Promise<TvDocument[]> {
  const colRef = collection(firestore, "tv");
  // Here we assume the date field is an object with a 'seconds' property.
  const q = query(colRef, orderBy("date.seconds", "desc"));
  const snapshot = await getDocs(q);
  const documents: TvDocument[] = [];
  snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    documents.push(doc.data() as TvDocument);
  });
  return documents;
}

/**
 * (Optional) Call this function after updating data in Firestore
 * to revalidate Next.js ISR pages.
 */
export function revalidateTVPage() {
  revalidatePath("/");
}
