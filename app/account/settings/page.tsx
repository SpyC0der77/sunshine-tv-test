import Layout from "../../components/Layout"
import AccountLayout from "../../components/AccountLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AccountSettingsPage() {
  return (
    <Layout showSearch={false}>
      <AccountLayout>
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Your Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Account settings content will go here.</p>
          </CardContent>
        </Card>
      </AccountLayout>
    </Layout>
  )
}

