import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { VideoComment } from "@/types/videoComments";

const FEEDBACK_TABLE_ID = "74437";

interface UseVideoCommentsProps {
  submissionId: string;
  currentUserId: string;
}

interface UseVideoCommentsReturn {
  comments: VideoComment[];
  isLoading: boolean;
  addComment: (timestamp: number, content: string) => Promise<void>;
  resolveComment: (commentId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  refreshComments: () => Promise<void>;
}

/**
 * Hook for managing video review comments with optimistic updates
 * Follows Giggo G2S2 Standard (Optimistic UI)
 */
export const useVideoComments = ({
  submissionId,
  currentUserId
}: UseVideoCommentsProps): UseVideoCommentsReturn => {
  const [comments, setComments] = useState<VideoComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load comments from database
  const loadComments = useCallback(async () => {
    try {
      const { data, error } = await window.ezsite.apis.tablePage(FEEDBACK_TABLE_ID, {
        PageNo: 1,
        PageSize: 100,
        OrderByField: "timestamp_seconds",
        IsAsc: true,
        Filters: [
          { name: "submission_id", op: "Equal", value: submissionId }
        ]
      });

      if (error) {
        console.error("Failed to load comments:", error);
        toast.error("Failed to load comments");
        return;
      }

      setComments((data?.List || []) as VideoComment[]);
    } catch (error) {
      console.error("Error loading comments:", error);
      toast.error("Error loading comments");
    } finally {
      setIsLoading(false);
    }
  }, [submissionId]);

  // Initial load
  useEffect(() => {
    loadComments();
  }, [loadComments]);

  // Add comment with optimistic update
  const addComment = useCallback(async (timestamp: number, content: string) => {
    const optimisticComment: VideoComment = {
      id: `temp-${Date.now()}`,
      submission_id: submissionId,
      user_id: currentUserId,
      timestamp_seconds: timestamp,
      content,
      is_resolved: false,
      created_at: new Date().toISOString()
    };

    // Optimistic update
    setComments(prev => [...prev, optimisticComment]);

    try {
      const { error } = await window.ezsite.apis.tableCreate(FEEDBACK_TABLE_ID, {
        submission_id: submissionId,
        user_id: currentUserId,
        timestamp_seconds: timestamp,
        content,
        is_resolved: false
      });

      if (error) {
        // Revert on error
        setComments(prev => prev.filter(c => c.id !== optimisticComment.id));
        throw error;
      }

      // Reload to get real ID from database
      await loadComments();
      toast.success("Comment added");
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("Failed to add comment");
      throw error;
    }
  }, [submissionId, currentUserId, loadComments]);

  // Resolve comment with optimistic update
  const resolveComment = useCallback(async (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    // Optimistic update
    setComments(prev =>
      prev.map(c => c.id === commentId ? { ...c, is_resolved: true } : c)
    );

    try {
      const { error } = await window.ezsite.apis.tableUpdate(FEEDBACK_TABLE_ID, {
        ID: parseInt(commentId),
        is_resolved: true
      });

      if (error) {
        // Revert on error
        setComments(prev =>
          prev.map(c => c.id === commentId ? { ...c, is_resolved: false } : c)
        );
        throw error;
      }

      toast.success("Comment resolved");
    } catch (error) {
      console.error("Failed to resolve comment:", error);
      toast.error("Failed to resolve comment");
      throw error;
    }
  }, [comments]);

  // Delete comment with optimistic update
  const deleteComment = useCallback(async (commentId: string) => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    // Optimistic update
    setComments(prev => prev.filter(c => c.id !== commentId));

    try {
      const { error } = await window.ezsite.apis.tableDelete(FEEDBACK_TABLE_ID, {
        ID: parseInt(commentId)
      });

      if (error) {
        // Revert on error
        setComments(prev => [...prev, comment]);
        throw error;
      }

      toast.success("Comment deleted");
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("Failed to delete comment");
      throw error;
    }
  }, [comments]);

  return {
    comments,
    isLoading,
    addComment,
    resolveComment,
    deleteComment,
    refreshComments: loadComments
  };
};
