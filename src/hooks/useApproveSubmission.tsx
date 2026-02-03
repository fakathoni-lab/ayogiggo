import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ApproveSubmissionParams {
  submissionId: string;
}

interface ApprovalResult {
  success: boolean;
  message: string;
  submission_id: string;
  brand_ledger_id: string;
  creator_ledger_id: string;
  amount_released: number;
  brand_pending_balance: number;
  creator_available_balance: number;
  notification_id?: number;
}

/**
 * Hook for approving submissions and releasing escrow funds.
 *
 * This hook calls a server-side RPC function that:
 * 1. Verifies Brand ownership
 * 2. Updates Submission status to 'APPROVED'
 * 3. Moves funds from Brand's pending_balance to Creator's available_balance
 * 4. Creates immutable audit trail in transaction_ledgers
 * 5. Sends notification to Creator
 *
 * All operations are ACID-compliant (atomic transaction).
 */
export const useApproveSubmission = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ submissionId }: ApproveSubmissionParams) => {
      if (!user?.id) {
        throw new Error("Not authenticated");
      }

      // Call the Supabase RPC function
      const { data, error } = await supabase.rpc(
        "approve_submission_and_release_escrow",
        {
          _submission_id: submissionId,
          _brand_user_id: user.id
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("Failed to approve submission");
      }

      return data as ApprovalResult;
    },
    onSuccess: (data) => {
      // Invalidate relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["wallet", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });

      // Show success toast with confetti-worthy message
      toast.success("Funds Released! 🎉", {
        description: `$${data.amount_released.toFixed(2)} has been released to the creator's wallet.`
      });
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error("Approval Failed", {
        description: error.message
      });
    }
  });
};

/**
 * Hook to check if a submission can be approved.
 * Useful for validation before showing the approval button.
 */
export const useCanApproveSubmission = () => {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (submissionId: string) => {
      if (!user?.id) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase.rpc("can_approve_submission", {
        _submission_id: submissionId,
        _brand_user_id: user.id
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as {
        can_approve: boolean;
        reason?: string;
        amount?: number;
        creator_id?: string;
        campaign_title?: string;
      };
    }
  });
};