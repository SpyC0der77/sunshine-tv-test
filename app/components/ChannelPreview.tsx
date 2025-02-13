"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Camera } from "lucide-react"
import { updateChannel } from "../actions/channelActions"
import { useToast } from "@/components/ui/use-toast"

interface ChannelPreviewProps {
  initialName: string
  initialBanner: string
  initialIcon: string
}

export default function ChannelPreview({ initialName, initialBanner, initialIcon }: ChannelPreviewProps) {
  const [name, setName] = useState(initialName)
  const [banner, setBanner] = useState(initialBanner)
  const [icon, setIcon] = useState(initialIcon)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setBanner(e.target.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setIcon(e.target.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    const result = await updateChannel({ name, banner, icon })
    setIsLoading(false)

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      })
      setIsEditing(false)
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-32 sm:h-48 md:h-64">
        <Image src={banner || "/placeholder.svg"} alt="Channel Banner" fill className="object-cover" />
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Label htmlFor="banner-upload" className="cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
                <Camera className="w-6 h-6 text-gray-600" />
              </div>
            </Label>
            <Input id="banner-upload" type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
          </div>
        )}
      </div>
      <CardContent className="relative -mt-16 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={icon} alt="Channel Icon" />
                <AvatarFallback>{name[0]}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Label
                  htmlFor="icon-upload"
                  className="absolute bottom-0 right-0 cursor-pointer bg-white rounded-full p-2"
                >
                  <Camera className="w-5 h-5 text-gray-600" />
                </Label>
              )}
              <Input id="icon-upload" type="file" accept="image/*" className="hidden" onChange={handleIconChange} />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              {isEditing ? (
                <Input value={name} onChange={handleNameChange} className="text-2xl font-bold mb-2" />
              ) : (
                <h2 className="text-2xl font-bold mb-2">{name}</h2>
              )}
              <p className="text-gray-600">1.2M subscribers</p>
            </div>
          </div>
          <div>
            {isEditing ? (
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Channel</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

