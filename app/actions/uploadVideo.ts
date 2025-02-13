"use server";

import app from "./firebaseClient";
import { revalidatePath } from "next/cache";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Uploads a video file from the provided FormData to Firebase Storage
 * and then stores metadata in Firestore.
 *
 * @param formData A FormData instance containing a file under the "video" key.
 * @param onProgress Optional callback to simulate upload progress.
 * @returns An object containing the success status, public URL of the video, and Firestore document ID.
 */
export async function uploadVideo(
  formData: FormData,
  onProgress?: (progress: number) => void
) {
  // Retrieve the video file from FormData.
  const file = formData.get("video");
  if (!file || !(file instanceof File)) {
    throw new Error("No video file provided");
  }

  // Generate a unique file name.
  const fileName = `videos/${Date.now()}-${file.name}`;

  // Get Firebase Storage and Firestore instances from your client SDK app.
  const storage = getStorage(app);
  const firestore = getFirestore(app);

  // Create a storage reference for the file.
  const storageRef = ref(storage, fileName);

  // Simulate progress updates (up to 90%) while uploading.
  let progress = 0;
  const intervalId = onProgress
    ? setInterval(() => {
        progress = Math.min(progress + 10, 90);
        onProgress(progress);
      }, 500)
    : null;

  try {
    // Upload the file. The uploadBytes() function does not support progress events,
    // so we simulate them above.
    await uploadBytes(storageRef, file, { contentType: file.type });

    // Clear the simulated progress and update to 100%.
    if (intervalId) {
      clearInterval(intervalId);
      onProgress(100);
    }

    // Retrieve the public download URL.
    const publicUrl = await getDownloadURL(storageRef);

    // Save metadata in Firestore.
    const docRef = await addDoc(collection(firestore, "videos"), {
      url: publicUrl,
      fileName,
      createdAt: serverTimestamp(),
      // Additional metadata can be added here.
    });

    console.log(
      "Uploaded video to Firebase Storage and saved metadata with document ID:",
      docRef.id
    );

    // Revalidate the homepage (or any other paths) if using Next.js ISR.
    revalidatePath("/");

    return { success: true, url: publicUrl, id: docRef.id };
  } catch (error) {
    if (intervalId) clearInterval(intervalId);
    console.error("Error uploading video:", error);
    throw error;
  }
}
