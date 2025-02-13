import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export interface QueueItem {
  id: number
  title: string
  thumbnail: string
  creator: string
}

interface VideoQueueProps {
  items: QueueItem[]
  onVideoSelect: (video: QueueItem) => void
}

export default function VideoQueue({ items, onVideoSelect }: VideoQueueProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Up Next</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition duration-200"
              onClick={() => onVideoSelect(item)}
            >
              <div className="relative w-24 h-14 flex-shrink-0">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-semibold text-sm truncate">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.creator}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

