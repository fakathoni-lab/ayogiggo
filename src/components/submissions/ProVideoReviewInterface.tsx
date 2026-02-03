import { useState, useCallback } from "react";
import { ProVideoPlayer } from "./ProVideoPlayer";
import { VideoCommentsSidebar } from "./VideoCommentsSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useVideoComments } from "@/hooks/useVideoComments";
import type { VideoComment } from "@/types/videoComments";

interface ProVideoReviewInterfaceProps {
  submissionId: string;
  videoUrl: string;
  currentUserId: string;
  submissionStatus: "submitted" | "approved" | "declined" | "redo_requested";
}

export const ProVideoReviewInterface = ({
  submissionId,
  videoUrl,
  currentUserId,
  submissionStatus
}: ProVideoReviewInterfaceProps) => {
  const [clickedTimestamp, setClickedTimestamp] = useState<number | null>(null);
  const [seekToTime, setSeekToTime] = useState<number | undefined>();

  const {
    comments,
    isLoading,
    addComment,
    resolveComment,
    deleteComment
  } = useVideoComments({ submissionId, currentUserId });

  const showWatermark = submissionStatus === "submitted" || submissionStatus === "redo_requested";

  // Handle timeline click
  const handleTimelineClick = useCallback((time: number) => {
    setClickedTimestamp(time);
    setSeekToTime(time);
  }, []);

  // Handle comment click
  const handleCommentClick = useCallback((comment: VideoComment) => {
    setSeekToTime(comment.timestamp_seconds);
  }, []);

  // Handle add comment
  const handleAddComment = useCallback(async (timestamp: number, content: string) => {
    await addComment(timestamp, content);
    setClickedTimestamp(null);
  }, [addComment]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
        <div className="lg:col-span-2">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>);

  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[600px]">
      {/* Video Player */}
      <div className="lg:col-span-2">
        <ProVideoPlayer
          videoUrl={videoUrl}
          comments={comments}
          onTimeClick={handleTimelineClick}
          onCommentClick={handleCommentClick}
          showWatermark={showWatermark}
          currentTime={seekToTime} />

      </div>

      {/* Comments Sidebar */}
      <div className="h-[600px]">
        <VideoCommentsSidebar
          submissionId={submissionId}
          comments={comments}
          currentUserId={currentUserId}
          newCommentTimestamp={clickedTimestamp}
          onCommentClick={handleCommentClick}
          onAddComment={handleAddComment}
          onResolveComment={resolveComment}
          onDeleteComment={deleteComment} />

      </div>
    </div>);

};