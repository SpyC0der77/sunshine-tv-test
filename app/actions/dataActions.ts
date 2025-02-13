"use server"

import { revalidatePath } from "next/cache"

export interface VideoData {
  id: string
  src: string
  title: string
  description: string
  views: string
  uploadDate: string
  likes: string
  channel: {
    name: string
    avatar: string
    subscribers: string
  }
}

export interface QueueItem {
  id: number
  title: string
  thumbnail: string
  creator: string
}

// Mock database data
const videos: VideoData[] = [
  {
    id: "bigbuckbunny",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Big Buck Bunny",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.",
    views: "1.2M views",
    uploadDate: "3 months ago",
    likes: "52K",
    channel: {
      name: "Blender Foundation",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "500K subscribers",
    },
  },
  {
    id: "elephantsdream",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Elephant Dream",
    description: "The first Blender Open Movie from 2006",
    views: "850K views",
    uploadDate: "4 months ago",
    likes: "42K",
    channel: {
      name: "Blender Foundation",
      avatar: "/placeholder.svg?height=48&width=48",
      subscribers: "500K subscribers",
    },
  },
]

const queueItems: QueueItem[] = [
  {
    id: 1,
    title: "Elephant Dream",
    thumbnail: "/placeholder.svg?height=90&width=160",
    creator: "Blender Foundation",
  },
  {
    id: 2,
    title: "Sintel",
    thumbnail: "/placeholder.svg?height=90&width=160",
    creator: "Blender Foundation",
  },
  {
    id: 3,
    title: "Tears of Steel",
    thumbnail: "/placeholder.svg?height=90&width=160",
    creator: "Blender Foundation",
  },
  {
    id: 4,
    title: "Cosmos Laundromat",
    thumbnail: "/placeholder.svg?height=90&width=160",
    creator: "Blender Foundation",
  },
  {
    id: 5,
    title: "The Daily Dweebs",
    thumbnail: "/placeholder.svg?height=90&width=160",
    creator: "Blender Foundation",
  },
]

export async function getVideoById(id: string): Promise<VideoData | null> {
  // In a real app, this would be a database query
  const video = videos.find((v) => v.id === id)
  return video || null
}

export async function getQueueItems(): Promise<QueueItem[]> {
  // In a real app, this would be a database query
  return queueItems
}

export async function searchVideos(query: string): Promise<QueueItem[]> {
  // In a real app, this would be a database query
  const filteredItems = queueItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.creator.toLowerCase().includes(query.toLowerCase()),
  )
  return filteredItems
}

export async function getRecentSearches(): Promise<string[]> {
  // In a real app, this would be fetched from a database or local storage
  return ["princess diana nicki", "elon musk bbc interview", "the penguin trailer"]
}

export async function addToRecentSearches(query: string): Promise<void> {
  // In a real app, this would save to a database or local storage
  console.log("Adding to recent searches:", query)
  revalidatePath("/")
}

interface HistoryItem {
  id: number
  title: string
  thumbnail: string
  creator: string
  watchedDate: string
}

export async function getViewingHistory(): Promise<HistoryItem[]> {
  // In a real app, this would fetch from a database
  return [
    {
      id: 1,
      title: "Amazing Landscapes",
      thumbnail: "/placeholder.svg?height=90&width=160",
      creator: "Nature Channel",
      watchedDate: "2023-07-01",
    },
    {
      id: 2,
      title: "Cooking Masterclass",
      thumbnail: "/placeholder.svg?height=90&width=160",
      creator: "Chef's Kitchen",
      watchedDate: "2023-06-28",
    },
    {
      id: 3,
      title: "Space Exploration Documentary",
      thumbnail: "/placeholder.svg?height=90&width=160",
      creator: "Science Now",
      watchedDate: "2023-06-25",
    },
    {
      id: 4,
      title: "Beginner's Guide to Programming",
      thumbnail: "/placeholder.svg?height=90&width=160",
      creator: "Code Masters",
      watchedDate: "2023-06-22",
    },
    {
      id: 5,
      title: "World History: Ancient Civilizations",
      thumbnail: "/placeholder.svg?height=90&width=160",
      creator: "History Buff",
      watchedDate: "2023-06-20",
    },
  ]
}

