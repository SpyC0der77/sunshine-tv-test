import Layout from "../../components/Layout"
import AccountLayout from "../../components/AccountLayout"
import ChannelPreview from "../../components/ChannelPreview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"

// In a real application, you would fetch this data from your backend
const channelData = {
  name: "Your Channel Name",
  banner: "/placeholder.svg?height=240&width=1280",
  icon: "/placeholder-user.jpg",
  subscribers: "1.2M",
  videoCount: "150",
  totalViews: "10.5M",
  totalLikes: "500K",
}

export default function ProfilePage() {
  return (
    <Layout showSearch={false}>
      <AccountLayout>
        <div className="space-y-6 mt-6 md:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold">Your Channel</h1>

          <ChannelPreview
            initialName={channelData.name}
            initialBanner={channelData.banner}
            initialIcon={channelData.icon}
          />

          <Card>
            <CardHeader>
              <CardTitle>Channel Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{channelData.subscribers}</h3>
                  <p className="text-sm text-gray-600">Subscribers</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{channelData.videoCount}</h3>
                  <p className="text-sm text-gray-600">Videos</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{channelData.totalViews}</h3>
                  <p className="text-sm text-gray-600">Total Views</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{channelData.totalLikes}</h3>
                  <p className="text-sm text-gray-600">Total Likes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About Your Channel</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This is where you can add a description of your channel. Talk about the type of content you create, your
                upload schedule, or anything else you want your viewers to know about you and your channel.
              </p>
            </CardContent>
          </Card>
        </div>
        <Toaster />
      </AccountLayout>
    </Layout>
  )
}

