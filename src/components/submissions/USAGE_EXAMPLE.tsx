/**
 * Pro Video Review Interface - Usage Example
 *
 * This file demonstrates how to integrate the video review system
 * into your submission review workflow.
 */

import { ProVideoReviewInterface } from "./ProVideoReviewInterface";
import { useAuth } from "@/hooks/useAuth";

// Example 1: Basic Integration
export const BasicExample = () => {
  const { user } = useAuth();

  const submission = {
    id: "submission-uuid-123",
    video_url: "https://storage.example.com/video.mp4",
    status: "submitted" as const
  };

  if (!user?.id) return null;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Review Video Submission</h2>

      <ProVideoReviewInterface
        submissionId={submission.id}
        videoUrl={submission.video_url}
        currentUserId={user.id}
        submissionStatus={submission.status} />

    </div>);

};

// Example 2: Conditional Rendering (Only for pending/redo submissions)
export const ConditionalExample = ({ submission }: {submission: any;}) => {
  const { user } = useAuth();

  const canReview =
  submission.status === "submitted" ||
  submission.status === "redo_requested";

  if (!canReview || !submission.video_url || !user?.id) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Video review not available for this submission</p>
      </div>);

  }

  return (
    <ProVideoReviewInterface
      submissionId={submission.id}
      videoUrl={submission.video_url}
      currentUserId={user.id}
      submissionStatus={submission.status} />);


};

// Example 3: Expandable Section (as used in SubmissionReviewCard)
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ExpandableExample = ({ submission }: {submission: any;}) => {
  const { user } = useAuth();
  const [showVideoReview, setShowVideoReview] = useState(false);

  if (!submission.video_url || !user?.id) return null;

  return (
    <div className="space-y-4">
      {/* Toggle Button */}
      <Button
        variant="outline"
        onClick={() => setShowVideoReview(!showVideoReview)}
        className="border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10">

        <Video className="w-4 h-4 mr-2" />
        {showVideoReview ? "Hide" : "Review"} Video with Comments
        {showVideoReview ?
        <ChevronUp className="w-4 h-4 ml-2" /> :

        <ChevronDown className="w-4 h-4 ml-2" />
        }
      </Button>

      {/* Expandable Interface */}
      <AnimatePresence>
        {showVideoReview &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}>

            <ProVideoReviewInterface
            submissionId={submission.id}
            videoUrl={submission.video_url}
            currentUserId={user.id}
            submissionStatus={submission.status} />

          </motion.div>
        }
      </AnimatePresence>
    </div>);

};

// Example 4: Custom Hook Usage (Advanced)
import { useVideoComments } from "@/hooks/useVideoComments";

export const CustomHookExample = () => {
  const { user } = useAuth();
  const submissionId = "submission-uuid-123";

  const {
    comments,
    isLoading,
    addComment,
    resolveComment,
    deleteComment
  } = useVideoComments({
    submissionId,
    currentUserId: user?.id || ""
  });

  const handleQuickComment = async () => {
    // Add a comment at 10 seconds
    await addComment(10.0, "Great intro! But audio needs improvement.");
  };

  const handleResolveAll = async () => {
    // Resolve all unresolved comments
    const unresolved = comments.filter((c) => !c.is_resolved);
    await Promise.all(unresolved.map((c) => resolveComment(c.id)));
  };

  if (isLoading) return <div>Loading comments...</div>;

  return (
    <div>
      <p>Total Comments: {comments.length}</p>
      <p>Unresolved: {comments.filter((c) => !c.is_resolved).length}</p>

      <Button onClick={handleQuickComment}>Add Quick Comment</Button>
      <Button onClick={handleResolveAll}>Resolve All</Button>
    </div>);

};