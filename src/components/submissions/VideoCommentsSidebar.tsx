import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Check, Loader2, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VideoComment {
  id: string;
  timestamp_seconds: number;
  content: string;
  user_id: string;
  is_resolved: boolean;
  created_at?: string;
}

interface VideoCommentsSidebarProps {
  submissionId: string;
  comments: VideoComment[];
  currentUserId: string;
  newCommentTimestamp: number | null;
  onCommentClick: (comment: VideoComment) => void;
  onAddComment: (timestamp: number, content: string) => Promise<void>;
  onResolveComment: (commentId: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
}

export const VideoCommentsSidebar = ({
  submissionId,
  comments,
  currentUserId,
  newCommentTimestamp,
  onCommentClick,
  onAddComment,
  onResolveComment,
  onDeleteComment
}: VideoCommentsSidebarProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

  const sortedComments = [...comments].sort((a, b) => a.timestamp_seconds - b.timestamp_seconds);

  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor(seconds % 1 * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || newCommentTimestamp === null) {
      toast.error("Please enter a comment");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddComment(newCommentTimestamp, newComment.trim());
      setNewComment("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResolve = async (commentId: string) => {
    try {
      await onResolveComment(commentId);
      toast.success("Comment marked as resolved");
    } catch (error) {
      toast.error("Failed to resolve comment");
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await onDeleteComment(commentId);
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-500" />
          <h3 className="font-semibold text-lg">Video Feedback</h3>
          <span className="ml-auto text-sm text-muted-foreground">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
      </div>

      {/* Comments List */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {sortedComments.map((comment) => {
              const isOwn = comment.user_id === currentUserId;
              const isActive = activeCommentId === comment.id;

              return (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-all",
                    comment.is_resolved ?
                    "bg-green-500/10 border-green-500/30" :
                    "bg-card border-border hover:border-cyan-500/50",
                    isActive && "ring-2 ring-cyan-500"
                  )}
                  onClick={() => {
                    setActiveCommentId(comment.id);
                    onCommentClick(comment);
                  }}>

                  <div className="flex items-start gap-2 mb-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-primary/10">
                        {isOwn ? "You" : "B"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCommentClick(comment);
                          }}
                          className="flex items-center gap-1.5 text-xs font-mono text-cyan-500 hover:text-cyan-400 transition-colors">

                          <Clock className="w-3 h-3" />
                          {formatTimestamp(comment.timestamp_seconds)}
                        </button>

                        {comment.is_resolved &&
                        <span className="flex items-center gap-1 text-xs text-green-600">
                            <Check className="w-3 h-3" />
                            Resolved
                          </span>
                        }
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-foreground mb-3 whitespace-pre-wrap">
                    {comment.content}
                  </p>

                  {/* Actions */}
                  {isOwn &&
                  <div className="flex items-center gap-2">
                      {!comment.is_resolved &&
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs text-green-600 hover:text-green-700 hover:bg-green-500/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResolve(comment.id);
                      }}>

                          <Check className="w-3 h-3 mr-1" />
                          Resolve
                        </Button>
                    }
                      <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-500/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(comment.id);
                      }}>

                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  }
                </motion.div>);

            })}
          </AnimatePresence>

          {sortedComments.length === 0 &&
          <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No comments yet</p>
              <p className="text-xs mt-1">Click on the timeline to add feedback</p>
            </div>
          }
        </div>
      </ScrollArea>

      {/* New Comment Form */}
      {newCommentTimestamp !== null &&
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">

          <div className="mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-500" />
            <span className="text-sm font-mono text-cyan-500">
              {formatTimestamp(newCommentTimestamp)}
            </span>
          </div>

          <Textarea
          placeholder="Add your feedback here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-3 min-h-[100px] resize-none bg-background"
          disabled={isSubmitting} />


          <div className="flex gap-2">
            <Button
            onClick={handleAddComment}
            disabled={isSubmitting || !newComment.trim()}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600">

              {isSubmitting ?
            <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </> :

            <>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </>
            }
            </Button>
          </div>
        </motion.div>
      }
    </div>);

};