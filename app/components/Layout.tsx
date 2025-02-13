import Link from "next/link"
import { Home, User, Upload } from "lucide-react"
import SearchBar from "./SearchBar"
import type React from "react"

interface LayoutProps {
  children: React.ReactNode
  showSearch?: boolean
}

export default function Layout({ children, showSearch = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">Video Platform</h1>
            </Link>
            {showSearch && <SearchBar onSearch={(query) => console.log("Searching for:", query)} />}
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/account"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </Link>
              <Link
                href="/upload"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

