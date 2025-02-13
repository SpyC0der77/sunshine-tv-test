import { SidebarProvider } from "@/components/ui/sidebar"
import AccountSidebar from "./AccountSidebar"
import type React from "react"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
        <AccountSidebar />
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  )
}

