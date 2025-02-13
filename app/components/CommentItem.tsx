"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number
  author: string
  content: string
  avatar: string
  replies?: Comment[]
}

interface CommentItemProps {
  comment: Comment
  onReply: (content: string) => void
}

export default function CommentItem({ comment, onReply }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (replyContent.trim()) {
      onReply(replyContent)
      setReplyContent("")
      setIsReplying(false)
    }
  }

  return (
    <li className="space-y-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={comment.avatar} alt={comment.author} />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{comment.author}</p>
          <p className="text-sm text-gray-600">{comment.content}</p>
          <Button variant="link" onClick={() => setIsReplying(!isReplying)} className="p-0 h-auto text-sm">
            Reply
          </Button>
        </div>
      </div>
      {isReplying && (
        <form onSubmit={handleReply} className="ml-12 mt-2">
          <Textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-2"
          />
          <Button type="submit" size="sm">
            Post Reply
          </Button>
        </form>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <ul className="ml-12 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </ul>
      )}
    </li>
  )
}

