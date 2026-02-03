import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

// Table IDs from Ezsite Database
const WALLETS_TABLE_ID = 74432;
const TRANSACTION_LEDGERS_TABLE_ID = 74433;
const SUBMISSIONS_TABLE_ID = 74434;

export interface EarningDataPoint {
  date: string;
  amount: number;
}

export interface AnalyticsStats {
  totalEarned: number;
  pendingEscrow: number;
  completedJobs: number;
}

// Fetch analytics statistics
export const useAnalyticsStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["analytics-stats", user?.ID],
    queryFn: async (): Promise<AnalyticsStats> => {
      if (!user) throw new Error("Not authenticated");

      try {
        // Fetch wallet data
        const { data: walletData, error: walletError } = await window.ezsite.apis.tablePage(
          WALLETS_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [{ name: "user_id", op: "Equal", value: String(user.ID) }]
          }
        );

        if (walletError) throw new Error(walletError);

        const wallet = walletData?.List?.[0];

        // Fetch completed submissions count
        const { data: submissionsData, error: submissionsError } = await window.ezsite.apis.tablePage(
          SUBMISSIONS_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [
            { name: "creator_id", op: "Equal", value: String(user.ID) },
            { name: "status", op: "Equal", value: "approved" }]

          }
        );

        if (submissionsError) throw new Error(submissionsError);

        // Fetch total earnings from transaction ledgers
        const { data: earningsData, error: earningsError } = await window.ezsite.apis.tablePage(
          TRANSACTION_LEDGERS_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1000, // Get all transactions for calculation
            Filters: [
            { name: "wallet_id", op: "Equal", value: String(wallet?.ID || 0) },
            { name: "type", op: "Equal", value: "earning" },
            { name: "status", op: "Equal", value: "success" }]

          }
        );

        if (earningsError) throw new Error(earningsError);

        const totalEarned = earningsData?.List?.reduce(
          (sum: number, tx: any) => sum + (Number(tx.amount) || 0),
          0
        ) || 0;

        return {
          totalEarned,
          pendingEscrow: Number(wallet?.pending_balance || 0),
          completedJobs: submissionsData?.VirtualCount || 0
        };
      } catch (error) {
        console.error("Analytics stats fetch error:", error);
        return {
          totalEarned: 0,
          pendingEscrow: 0,
          completedJobs: 0
        };
      }
    },
    enabled: !!user,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true
  });
};

// Fetch earnings data for chart
export const useEarningsData = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["earnings-data", user?.ID],
    queryFn: async (): Promise<EarningDataPoint[]> => {
      if (!user) throw new Error("Not authenticated");

      try {
        // Fetch wallet
        const { data: walletData, error: walletError } = await window.ezsite.apis.tablePage(
          WALLETS_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [{ name: "user_id", op: "Equal", value: String(user.ID) }]
          }
        );

        if (walletError) throw new Error(walletError);

        const wallet = walletData?.List?.[0];
        if (!wallet) return [];

        // Fetch all earning transactions
        const { data: transactionsData, error: transactionsError } = await window.ezsite.apis.tablePage(
          TRANSACTION_LEDGERS_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1000,
            OrderByField: "created_at",
            IsAsc: false,
            Filters: [
            { name: "wallet_id", op: "Equal", value: String(wallet.ID) },
            { name: "type", op: "Equal", value: "earning" },
            { name: "status", op: "Equal", value: "success" }]

          }
        );

        if (transactionsError) throw new Error(transactionsError);

        const transactions = transactionsData?.List || [];

        return transactions.map((tx: any) => ({
          date: tx.created_at,
          amount: Number(tx.amount) || 0
        }));
      } catch (error) {
        console.error("Earnings data fetch error:", error);
        return [];
      }
    },
    enabled: !!user,
    staleTime: 60000 // 1 minute
  });
};