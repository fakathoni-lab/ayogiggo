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
import {
  ExternalLink,
  Trophy,
  Check,
  X,
  RotateCcw,
  Loader2,
  MessageSquare } from
"lucide-react";
import { useReviewSubmission, type SubmissionWithCreator } from "@/hooks/useSubmissions";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface SubmissionReviewCardProps {
  submission: SubmissionWithCreator;
  onWinnerSelected?: () => void;
  isContestEnded?: boolean;
}

export const SubmissionReviewCard = ({
  submission,
  onWinnerSelected,
  isContestEnded = false
}: SubmissionReviewCardProps) => {
  const { t } = useTranslation();
  const [showWinnerConfirm, setShowWinnerConfirm] = useState(false);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = useCallback((newFeedback: string) => {
    setFeedback(newFeedback);
  }, []);

  const reviewSubmission = useReviewSubmission();

  const creatorName = submission.profiles?.full_name ||
  submission.profiles?.username ||
  "Kreator";
  const creatorInitial = creatorName.charAt(0).toUpperCase();
  const creatorAvatar = submission.profiles?.avatar_url;

  const handleApprove = () => {
    reviewSubmission.mutate({
      id: submission.id,
      action: "approve"
    });
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

  return (
    <>
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
                  variant="success"
                  onClick={handleApprove}
                  disabled={reviewSubmission.isPending}>

                    {reviewSubmission.isPending ?
                  <Loader2 className="w-4 h-4 animate-spin" /> :

                  <Check className="w-4 h-4" />
                  }
                    {t("submissions.review.approve")}
                  </Button>
                  
                  {!maxRedoReached &&
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFeedbackDialog(true)}
                  disabled={reviewSubmission.isPending}>

                      <RotateCcw className="w-4 h-4" />
                      {t("submissions.review.requestRedo")}
                    </Button>
                }
                  
                  <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDecline}
                  disabled={reviewSubmission.isPending}>

                    <X className="w-4 h-4" />
                    {t("submissions.review.reject")}
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
      </Card>

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