"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { uploadVideo } from "../actions/uploadVideo"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function UploadForm() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile)
      setVideoPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [videoFile])

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      setThumbnailFile(null)
      setThumbnailPreviewUrl(null)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "thumbnail.jpg", { type: "image/jpeg" })
            setThumbnailFile(file)
            setThumbnailPreviewUrl(URL.createObjectURL(blob))
          }
        },
        "image/jpeg",
        0.95,
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUploading(true)
    setUploadProgress(0)
    const formData = new FormData(formRef.current!)
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile)
    }
    try {
      await uploadVideo(formData, (progress) => {
        setUploadProgress(progress)
      })
      router.push("/account")
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const moveFrame = (delta: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + delta))
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="video">Video File</Label>
        <Input id="video" name="video" type="file" accept="video/*" onChange={handleVideoChange} required />
      </div>
      {videoPreviewUrl && (
        <div className="space-y-2">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src={videoPreviewUrl}
              className="w-full h-full object-cover rounded"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => moveFrame(-1 / 30)}
              title="Previous frame"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.001}
              onValueChange={handleSliderChange}
              className="flex-grow"
            />
            <Button type="button" variant="outline" size="icon" onClick={() => moveFrame(1 / 30)} title="Next frame">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <Button type="button" onClick={captureFrame} className="flex-shrink-0">
              Capture Thumbnail
            </Button>
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>
      {thumbnailPreviewUrl && (
        <div>
          <Label>Thumbnail Preview</Label>
          <img
            src={thumbnailPreviewUrl || "/placeholder.svg"}
            alt="Thumbnail preview"
            className="mt-2 max-w-full h-auto rounded"
          />
        </div>
      )}
      <Button type="submit" disabled={isUploading} className="w-full">
        {isUploading ? "Uploading..." : "Upload Video"}
      </Button>
      {isUploading && <Progress value={uploadProgress} className="w-full" />}
      <canvas ref={canvasRef} className="hidden" />
    </form>
  )
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

