"use server"

import { revalidatePath } from "next/cache"

export async function uploadVideo(formData: FormData, onProgress?: (progress: number) => void) {
  const totalSteps = 10
  for (let i = 1; i <= totalSteps; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    onProgress?.(i * 10)
  }

  console.log("Uploading video:", Object.fromEntries(formData))

  revalidatePath("/")

  return { success: true }
}

