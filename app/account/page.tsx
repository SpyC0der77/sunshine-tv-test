import Layout from "../components/Layout"
import AccountLayout from "../components/AccountLayout"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, BarChart2, Eye, ThumbsUp } from "lucide-react"
import Image from "next/image"

// This would typically come from a database
const uploadedVideos = [
  {
    id: 1,
    title: "My First Video",
    views: 1200,
    likes: 45,
    uploadDate: "2023-05-15",
    thumbnail: "/placeholder.svg?height=90&width=160",
  },
  {
    id: 2,
    title: "Coding Tutorial",
    views: 3500,
    likes: 120,
    uploadDate: "2023-06-02",
    thumbnail: "/placeholder.svg?height=90&width=160",
  },
  {
    id: 3,
    title: "Travel Vlog",
    views: 800,
    likes: 30,
    uploadDate: "2023-06-20",
    thumbnail: "/placeholder.svg?height=90&width=160",
  },
]

export default function AccountPage() {
  return (
    <Layout showSearch={false}>
      <AccountLayout>
        <div className="space-y-6 mt-6 md:mt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">My Videos</h1>
            <Link href="/upload">
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Upload New Video
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {uploadedVideos.reduce((sum, video) => sum + video.views, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {uploadedVideos.reduce((sum, video) => sum + video.likes, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">+15.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Video Count</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uploadedVideos.length}</div>
                <p className="text-xs text-muted-foreground">+2 new videos this month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recently Uploaded Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                {uploadedVideos.map((video) => (
                  <li key={video.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-32 h-40 sm:h-18 flex-shrink-0">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">{video.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {video.views.toLocaleString()} views • {video.likes.toLocaleString()} likes
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Uploaded on {video.uploadDate}</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                      Edit
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </AccountLayout>
    </Layout>
  )
}

