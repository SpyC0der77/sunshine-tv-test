"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPreviewProps {
  file: File
  onFrameCapture: (blob: Blob) => void
}

export default function VideoPreview({ file, onFrameCapture }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(file)
    }
  }, [file])

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSliderChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0]
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
            onFrameCapture(blob)
          }
        },
        "image/jpeg",
        0.95,
      )
    }
  }

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        className="w-full rounded"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        controls
      />
      <div className="flex items-center space-x-4">
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSliderChange}
          className="flex-grow"
        />
        <Button onClick={captureFrame}>Capture Thumbnail</Button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

