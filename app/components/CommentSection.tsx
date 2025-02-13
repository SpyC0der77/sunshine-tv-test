"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { postComment } from "../actions/commentActions"
import CommentItem from "./CommentItem"

interface Comment {
  id: number
  author: string
  content: string
  avatar: string
  replies?: Comment[]
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Alice",
    content: "Great video! Really enjoyed it.",
    avatar: "/placeholder.svg?height=32&width=32",
    replies: [
      {
        id: 4,
        author: "Bob",
        content: "Totally agree with you, Alice!",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
  {
    id: 2,
    author: "Charlie",
    content: "Interesting content, thanks for sharing!",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    author: "David",
    content: "Can't wait for the next one!",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = await postComment(newComment)
      setComments([comment, ...comments])
      setNewComment("")
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePostComment} className="mb-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Post Comment</Button>
        </form>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={(replyContent) => {
                const updatedComments = comments.map((c) =>
                  c.id === comment.id
                    ? {
                        ...c,
                        replies: [
                          ...(c.replies || []),
                          {
                            id: Date.now(),
                            author: "Current User",
                            content: replyContent,
                            avatar: "/placeholder.svg?height=32&width=32",
                          },
                        ],
                      }
                    : c,
                )
                setComments(updatedComments)
              }}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

