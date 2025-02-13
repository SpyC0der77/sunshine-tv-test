"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, ArrowRight } from "lucide-react"
import { getRecentSearches, addToRecentSearches } from "../actions/dataActions"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadRecentSearches = async () => {
      const searches = await getRecentSearches()
      setRecentSearches(searches)
    }
    loadRecentSearches()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      await addToRecentSearches(query)
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)])
      setIsOpen(false)
    }
  }

  const handleSearchClick = async (search: string) => {
    setQuery(search)
    onSearch(search)
    await addToRecentSearches(search)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative flex-1 max-w-xl">
      <form onSubmit={handleSubmit} className="flex w-full items-center">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-4 h-10 bg-gray-100 dark:bg-gray-800"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </form>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 py-2 shadow-lg z-50">
          <ul className="space-y-1">
            {recentSearches.map((search, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSearchClick(search)}
                  className="w-full flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Search className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="flex-1 text-left">{search}</span>
                  <ArrowRight className="h-4 w-4 text-gray-500" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}

