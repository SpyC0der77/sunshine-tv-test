"use client"

import * as React from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string
}

export default function VideoPlayer({ src, className, ...props }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [volume, setVolume] = React.useState(1)
  const [isMuted, setIsMuted] = React.useState(false)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout>()

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (Number.parseFloat(e.target.value) * videoRef.current.duration) / 100
      videoRef.current.currentTime = time
      setProgress(Number.parseFloat(e.target.value))
    }
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    setVolume(value)
    if (videoRef.current) {
      videoRef.current.volume = value
      setIsMuted(value === 0)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  React.useEffect(() => {
    const hideControlsTimer = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      setShowControls(true)
      if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 2000)
      }
    }

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener("mousemove", hideControlsTimer)
      videoElement.addEventListener("touchstart", hideControlsTimer)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("mousemove", hideControlsTimer)
        videoElement.removeEventListener("touchstart", hideControlsTimer)
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  return (
    <div className="relative group w-full aspect-video bg-black rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        className={cn("w-full h-full cursor-pointer", className)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={(e) => {
          e.stopPropagation()
          handlePlayPause()
        }}
        {...props}
      />

      {/* Controls overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Control buttons */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2 transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div className="w-full flex items-center gap-2 text-white/90 text-sm">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            value={progress}
            onChange={handleProgress}
            className="flex-1 h-1.5 rounded-full bg-white/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-primary"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => skipTime(-10)} className="text-white/90 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={handlePlayPause} className="text-white/90 hover:text-white transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button onClick={() => skipTime(10)} className="text-white/90 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button onClick={toggleMute} className="text-white/90 hover:text-white transition-colors">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolume}
                className="w-20 h-1.5 rounded-full bg-white/30 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleFullscreen} className="text-white/90 hover:text-white transition-colors">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

