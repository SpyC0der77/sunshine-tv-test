"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Settings, User, Clock, Video, Menu } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function AccountSidebar() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar()

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <Sidebar className="w-full md:w-64 md:h-screen border-r border-gray-200 dark:border-gray-800">
        <SidebarHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">User Name</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">user@example.com</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/account"}>
                <Link href="/account" className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  My Videos
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/account/profile"}>
                <Link href="/account/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/account/history"}>
                <Link href="/account/history" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Viewing History
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/account/settings"}>
                <Link href="/account/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  )
}

