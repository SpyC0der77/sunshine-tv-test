import Layout from "../../components/Layout"
import AccountLayout from "../../components/AccountLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getViewingHistory } from "../../actions/dataActions"
import Image from "next/image"

export default async function HistoryPage() {
  const history = await getViewingHistory()

  return (
    <Layout showSearch={false}>
      <AccountLayout>
        <h1 className="text-3xl font-bold mb-8">Viewing History</h1>
        <Card>
          <CardHeader>
            <CardTitle>Recently Watched Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {history.map((item) => (
                <li key={item.id} className="flex items-start space-x-4">
                  <div className="relative w-32 h-18 flex-shrink-0">
                    <Image
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.creator}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Watched on {item.watchedDate}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Watch Again
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </AccountLayout>
    </Layout>
  )
}

