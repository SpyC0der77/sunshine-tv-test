import Layout from "../components/Layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UploadForm from "../components/UploadForm"

export default function UploadPage() {
  return (
    <Layout showSearch={false}>
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Upload New Video</CardTitle>
        </CardHeader>
        <CardContent>
          <UploadForm />
        </CardContent>
      </Card>
    </Layout>
  )
}

