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
  addDoc,
  Timestamp,
} from "firebase/firestore";

export interface VideoData {
  id: string;
  src: string;
  title: string;
  description: string;
  views: string;
  uploadDate: string;
  likes: string;
  channel: {
    name: string;
    avatar: string;
    subscribers: string;
  };
}

export interface QueueItem {
  id: number;
  title: string;
  thumbnail: string;
  creator: string;
}

interface HistoryItem {
  id: number;
  title: string;
  thumbnail: string;
  creator: string;
  watchedDate: string;
}

// Initialize Firestore using your Firebase client.
const firestore = getFirestore(app);

/**
 * Retrieves a video document from Firestore by its id.
 * Assumes each video is stored as a document in the "videos" collection,
 * with the document id matching the video's id.
 */
export async function getVideoById(id: string): Promise<VideoData | null> {
  const docRef = doc(firestore, "videos", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as VideoData;
  }
  return null;
}

/**
 * Retrieves all queue items from the "queueItems" collection.
 */
export async function getQueueItems(): Promise<QueueItem[]> {
  const colRef = collection(firestore, "queueItems");
  const snapshot = await getDocs(colRef);
  const items: QueueItem[] = [];
  snapshot.forEach((doc) => {
    items.push(doc.data() as QueueItem);
  });
  return items;
}

/**
 * Searches for queue items by filtering titles and creator names.
 * Note: Firestore does not support partial string matching natively,
 * so we retrieve all items and filter them in memory.
 */
export async function searchVideos(queryStr: string): Promise<QueueItem[]> {
  const colRef = collection(firestore, "queueItems");
  const snapshot = await getDocs(colRef);
  const items: QueueItem[] = [];
  snapshot.forEach((doc) => {
    items.push(doc.data() as QueueItem);
  });
  const lowerQuery = queryStr.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.creator.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Retrieves recent searches from the "recentSearches" collection.
 * Assumes each document in the collection has a "query" field and a "createdAt" timestamp.
 */
export async function getRecentSearches(): Promise<string[]> {
  const colRef = collection(firestore, "recentSearches");
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const searches: string[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.query) {
      searches.push(data.query);
    }
  });
  return searches;
}

/**
 * Adds a new search query to the "recentSearches" collection.
 */
export async function addToRecentSearches(queryStr: string): Promise<void> {
  const colRef = collection(firestore, "recentSearches");
  await addDoc(colRef, {
    query: queryStr,
    createdAt: Timestamp.now(),
  });
  revalidatePath("/");
}

/**
 * Retrieves the viewing history from the "viewingHistory" collection.
 * Assumes each document corresponds to a HistoryItem.
 */
export async function getViewingHistory(): Promise<HistoryItem[]> {
  const colRef = collection(firestore, "viewingHistory");
  const q = query(colRef, orderBy("watchedDate", "desc"));
  const snapshot = await getDocs(q);
  const history: HistoryItem[] = [];
  snapshot.forEach((doc) => {
    history.push(doc.data() as HistoryItem);
  });
  return history;
}
