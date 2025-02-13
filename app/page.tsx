"use client"

import { useState, useEffect } from "react"
import Layout from "./components/Layout"
import VideoPlayer from "./components/VideoPlayer"
import CommentSection from "./components/CommentSection"
import VideoQueue from "./components/VideoQueue"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Bell } from "lucide-react"
import { getVideoById, getQueueItems, searchVideos, type VideoData, type QueueItem } from "./actions/dataActions"

export default function VideoPlayerPage() {
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [queueItems, setQueueItems] = useState<QueueItem[]>([])

  useEffect(() => {
    const initializeData = async () => {
      const [initialVideo, initialQueue] = await Promise.all([getVideoById("bigbuckbunny"), getQueueItems()])
      if (initialVideo) setVideoData(initialVideo)
      setQueueItems(initialQueue)
    }
    initializeData()
  }, [])

  const handleVideoSelect = async (video: QueueItem) => {
    const videoId = video.title.toLowerCase().replace(/\s+/g, "")
    const newVideoData = await getVideoById(videoId)
    if (newVideoData) {
      setVideoData(newVideoData)
    }

    const newQueueItems = queueItems.filter((item) => item.id !== video.id)
    const newVideo: QueueItem = {
      id: Math.max(...queueItems.map((item) => item.id)) + 1,
      title: "New Video",
      thumbnail: "/placeholder.svg?height=90&width=160",
      creator: "New Creator",
    }
    setQueueItems([...newQueueItems, newVideo])
  }

  const handleSearch = async (query: string) => {
    const results = await searchVideos(query)
    setQueueItems(results)
  }

  if (!videoData) return null

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <VideoPlayer src={videoData.src} />
          <Card className="mt-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">{videoData.title}</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {videoData.views} • {videoData.uploadDate}
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{videoData.likes}</span>
                  </Button>
                  <Button variant="outline">Share</Button>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={videoData.channel.avatar} alt={videoData.channel.name} />
                    <AvatarFallback>{videoData.channel.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{videoData.channel.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{videoData.channel.subscribers}</p>
                  </div>
                </div>
                <Button className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Subscribe</span>
                </Button>
              </div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">{videoData.description}</p>
            </CardContent>
          </Card>
          <CommentSection />
        </div>
        <div className="lg:w-1/3">
          <VideoQueue items={queueItems} onVideoSelect={handleVideoSelect} />
        </div>
      </div>
    </Layout>
  )
}

