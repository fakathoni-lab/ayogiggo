import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

// Notification types matching our Ezsite DB schema
export interface Notification {
  ID: number;
  user_id: string;
  type: "payment" | "system" | "campaign";
  title: string;
  message: string;
  is_read: boolean;
  metadata?: string;
  created_at: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: number) => Promise<void>;
  refreshNotifications: () => Promise<void>;
  isLoading: boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Fetch initial notifications from Ezsite DB
  const fetchNotifications = useCallback(async () => {
    if (!user?.ID) {
      setNotifications([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await window.ezsite.apis.listTables({
        tableName: "notifications",
        filters: [
          {
            name: "user_id",
            op: "Equal",
            value: user.ID,
          },
        ],
        orderByField: "created_at",
        isAsc: false,
        pageNo: 1,
        pageSize: 50,
      });

      if (response.error) {
        console.error("Failed to fetch notifications:", response.error);
        return;
      }

      setNotifications(response.data?.list || []);
    } catch (error) {
      console.error("Notification fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.ID]);

  // Real-time subscription to notifications table
  useEffect(() => {
    if (!user?.ID) return;

    fetchNotifications();

    // Poll for new notifications every 5 seconds (Ezsite DB real-time alternative)
    const pollInterval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [user?.ID, fetchNotifications]);

  // Listen for new notifications and trigger toast
  useEffect(() => {
    if (notifications.length === 0) return;

    const latestNotification = notifications[0];
    const notificationAge = Date.now() - new Date(latestNotification.created_at).getTime();

    // Only show toast for very recent notifications (within 10 seconds)
    if (notificationAge < 10000 && !latestNotification.is_read) {
      const toastConfig = {
        payment: { icon: "💰", duration: 5000 },
        campaign: { icon: "🎯", duration: 5000 },
        system: { icon: "🔔", duration: 4000 },
      };

      const config = toastConfig[latestNotification.type];

      toast(latestNotification.title, {
        description: latestNotification.message,
        icon: config.icon,
        duration: config.duration,
      });
    }
  }, [notifications]);

  // Mark notification as read (Optimistic Update)
  const markAsRead = async (notificationId: number) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.ID === notificationId ? { ...n, is_read: true } : n))
    );

    try {
      const response = await window.ezsite.apis.updateTable({
        tableName: "notifications",
        record: {
          ID: notificationId,
          is_read: true,
        },
      });

      if (response.error) {
        console.error("Failed to mark as read:", response.error);
        // Revert optimistic update on error
        setNotifications((prev) =>
          prev.map((n) => (n.ID === notificationId ? { ...n, is_read: false } : n))
        );
      }
    } catch (error) {
      console.error("Mark as read error:", error);
      // Revert optimistic update
      setNotifications((prev) =>
        prev.map((n) => (n.ID === notificationId ? { ...n, is_read: false } : n))
      );
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        refreshNotifications: fetchNotifications,
        isLoading,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
