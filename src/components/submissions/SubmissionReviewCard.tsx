import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle } from
"@/components/ui/alert-dialog";
import { FeedbackForm } from "./FeedbackForm";
import { ConfettiCelebration } from "@/components/shared/ConfettiCelebration";
import { ProVideoReviewInterface } from "./ProVideoReviewInterface";
import {
  ExternalLink,
  Trophy,
  Check,
  X,
  RotateCcw,
  Loader2,
  MessageSquare,
  DollarSign,
  AlertCircle,
  Video,
  ChevronDown,
  ChevronUp } from
"lucide-react";
import { useReviewSubmission, type SubmissionWithCreator } from "@/hooks/useSubmissions";
import { useApproveSubmission } from "@/hooks/useApproveSubmission";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface SubmissionReviewCardProps {
  submission: SubmissionWithCreator;
  onWinnerSelected?: () => void;
  isContestEnded?: boolean;
  campaignPrize?: number; // Prize amount for the campaign
}

export const SubmissionReviewCard = ({
  submission,
  onWinnerSelected,
  isContestEnded = false,
  campaignPrize = 0
}: SubmissionReviewCardProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [showWinnerConfirm, setShowWinnerConfirm] = useState(false);
  const [showApprovalConfirm, setShowApprovalConfirm] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [showVideoReview, setShowVideoReview] = useState(false);

  const handleFeedbackChange = useCallback((newFeedback: string) => {
    setFeedback(newFeedback);
  }, []);

  const reviewSubmission = useReviewSubmission();
  const approveSubmission = useApproveSubmission();

  const creatorName = submission.profiles?.full_name ||
  submission.profiles?.username ||
  "Kreator";
  const creatorInitial = creatorName.charAt(0).toUpperCase();
  const creatorAvatar = submission.profiles?.avatar_url;

  const handleApproveClick = () => {
    // Show confirmation modal before approving
    setShowApprovalConfirm(true);
  };

  const handleConfirmApproval = () => {
    // Call the server-side escrow release function
    approveSubmission.mutate(
      { submissionId: submission.id },
      {
        onSuccess: () => {
          setShowApprovalConfirm(false);
          setShowConfetti(true);
          // Hide confetti after 5 seconds
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }
    );
  };

  const handleDecline = () => {
    reviewSubmission.mutate({
      id: submission.id,
      action: "decline",
      decline_reason: "Konten tidak sesuai dengan brief"
    });
  };

  const handleRequestRedo = () => {
    if (!feedback.trim()) return;

    reviewSubmission.mutate(
      {
        id: submission.id,
        action: "request_redo",
        feedback: feedback.trim()
      },
      {
        onSuccess: () => {
          setShowFeedbackDialog(false);
          setFeedback("");
        }
      }
    );
  };

  const handleMarkWinner = () => {
    reviewSubmission.mutate(
      {
        id: submission.id,
        action: "approve"
      },
      {
        onSuccess: () => {
          setShowWinnerConfirm(false);
          onWinnerSelected?.();
        }
      }
    );
  };

  const isWinner = submission.status === "approved" && isContestEnded;
  const isPending = submission.status === "submitted";
  const canReview = isPending || submission.status === "redo_requested";
  const maxRedoReached = submission.redo_count >= 3;
  const isProcessing = approveSubmission.isPending || reviewSubmission.isPending;

  return (
    <>
      {showConfetti && <ConfettiCelebration />}

      <Card className={cn(
        "transition-all",
        isWinner && "border-amber-500/50 bg-amber-500/5"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Creator Avatar */}
            <Avatar className="w-12 h-12">
              <AvatarImage src={creatorAvatar || undefined} alt={creatorName} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {creatorInitial}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground truncate">
                  {creatorName}
                </h4>
                {isWinner &&
                <Trophy className="w-4 h-4 text-amber-500" />
                }
              </div>

              <div className="flex items-center gap-2 mb-2">
                <StatusBadge
                  status={submission.status === "approved" ? "approved" :
                  submission.status === "declined" ? "declined" :
                  submission.status === "redo_requested" ? "redo_requested" :
                  "pending"} />

                <span className="text-xs text-muted-foreground">
                  {format(new Date(submission.submitted_at), "dd MMM yyyy, HH:mm")}
                </span>
              </div>

              {/* Caption */}
              {submission.caption &&
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {submission.caption}
                </p>
              }

              {/* Brand feedback if redo requested */}
              {submission.status === "redo_requested" && submission.brand_feedback &&
              <div className="bg-warning/10 text-warning border border-warning/20 rounded-lg p-3 mb-3">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-medium mb-1">Feedback Brand:</p>
                      <p className="text-xs">{submission.brand_feedback}</p>
                    </div>
                  </div>
                </div>
              }

              {/* Video Review Toggle */}
              {submission.video_url &&
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowVideoReview(!showVideoReview)}
                className="mb-3 border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10">

                  <Video className="w-4 h-4 mr-2" />
                  {showVideoReview ? "Hide" : "Review"} Video with Comments
                  {showVideoReview ?
                <ChevronUp className="w-4 h-4 ml-2" /> :

                <ChevronDown className="w-4 h-4 ml-2" />
                }
                </Button>
              }

              {/* Content Link */}
              {submission.platform_url &&
              <a
                href={submission.platform_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">

                  <ExternalLink className="w-4 h-4" />
                  {t("submissions.review.viewContent")}
                </a>
              }
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              {canReview &&
              <>
                  <Button
                  size="sm"
                  variant="default"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg"
                  onClick={handleApproveClick}
                  disabled={isProcessing}>

                    {approveSubmission.isPending ?
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> :

                  <DollarSign className="w-4 h-4 mr-1.5" />
                  }
                    Approve & Release Funds
                  </Button>

                  {!maxRedoReached &&
                <Button
                  size="sm"
                  variant="outline"
                  className="border-warning text-warning hover:bg-warning/10"
                  onClick={() => setShowFeedbackDialog(true)}
                  disabled={isProcessing}>

                      <RotateCcw className="w-4 h-4 mr-1.5" />
                      Request Revision
                    </Button>
                }

                  <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                  onClick={handleDecline}
                  disabled={isProcessing}>

                    <X className="w-4 h-4 mr-1.5" />
                    Decline
                  </Button>
                </>
              }

              {submission.status === "approved" && !isContestEnded &&
              <Button
                size="sm"
                variant="outline"
                className="border-warning text-warning hover:bg-warning/10"
                onClick={() => setShowWinnerConfirm(true)}
                disabled={reviewSubmission.isPending}>

                  <Trophy className="w-4 h-4" />
                  {t("submissions.review.markWinner")}
                </Button>
              }
            </div>
          </div>
        </CardContent>

        {/* Pro Video Review Interface - Expanded */}
        <AnimatePresence>
          {showVideoReview && submission.video_url && user?.id &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden">

              <CardContent className="pt-0 pb-4">
                <div className="border-t border-border pt-4">
                  <ProVideoReviewInterface
                  submissionId={submission.id}
                  videoUrl={submission.video_url}
                  currentUserId={user.id}
                  submissionStatus={submission.status} />

                </div>
              </CardContent>
            </motion.div>
          }
        </AnimatePresence>
      </Card>

      {/* Approval & Escrow Release Confirmation Dialog */}
      <AlertDialog open={showApprovalConfirm} onOpenChange={setShowApprovalConfirm}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Approve & Release Funds?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2">
              <p className="text-sm">
                You are about to approve this submission and release{" "}
                <span className="font-semibold text-foreground">
                  ${campaignPrize.toFixed(2)}
                </span>{" "}
                to the creator's wallet.
              </p>
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-3">
                <p className="text-xs font-medium text-warning-foreground">
                  ⚠️ This action cannot be undone
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Funds will be moved from escrow to the creator's available balance immediately.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure you've reviewed the submission thoroughly before proceeding.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={approveSubmission.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmApproval}
              disabled={approveSubmission.isPending}
              className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700">

              {approveSubmission.isPending ?
              <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Processing...
                </> :

              <>
                  <Check className="w-4 h-4 mr-2" />
                  Approve & Release ${campaignPrize.toFixed(2)}
                </>
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Winner Confirmation Dialog */}
      <AlertDialog open={showWinnerConfirm} onOpenChange={setShowWinnerConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("submissions.review.winnerConfirm.title")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("submissions.review.winnerConfirm.message")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("submissions.review.winnerConfirm.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleMarkWinner}
              className="bg-warning hover:bg-warning/90 text-warning-foreground">

              <Trophy className="w-4 h-4 mr-2" />
              {t("submissions.review.winnerConfirm.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Feedback Dialog with Structured Form */}
      <AlertDialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <AlertDialogContent className="max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("submissions.review.requestRedo")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("feedback.dialogDescription", "Select the issues or provide detailed feedback to help the creator improve.")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <FeedbackForm onFeedbackChange={handleFeedbackChange} />
          
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("common.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRequestRedo}
              disabled={!feedback.trim() || reviewSubmission.isPending}>

              {reviewSubmission.isPending ?
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> :

              <RotateCcw className="w-4 h-4 mr-2" />
              }
              {t("feedback.sendFeedback", "Send Feedback")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>);

};

export default SubmissionReviewCard;