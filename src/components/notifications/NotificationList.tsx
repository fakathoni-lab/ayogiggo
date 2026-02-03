import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Check, Zap, CreditCard, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NotificationListProps {
  onClose: () => void;
}

export const NotificationList = ({ onClose }: NotificationListProps) => {
  const { notifications, isLoading, markAsRead, unreadCount } = useNotifications();
  const navigate = useNavigate();

  // Icon mapping for notification types
  const getIcon = (type: Notification["type"]) => {
    const icons = {
      payment: <CreditCard className="w-4 h-4" />,
      campaign: <Megaphone className="w-4 h-4" />,
      system: <Zap className="w-4 h-4" />
    };
    return icons[type];
  };

  // Handle notification click
  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await markAsRead(notification.ID);
    }

    // Parse metadata for navigation
    try {
      const metadata = notification.metadata ? JSON.parse(notification.metadata) : {};

      if (metadata.redirectUrl) {
        navigate(metadata.redirectUrl);
        onClose();
      }
    } catch (error) {
      console.error("Failed to parse notification metadata:", error);
    }
  };

  // Mark all as read
  const handleMarkAllRead = async () => {
    const unreadNotifications = notifications.filter((n) => !n.is_read);
    await Promise.all(unreadNotifications.map((n) => markAsRead(n.ID)));
  };

  return (
    <div className="flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {unreadCount > 0 &&
          <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
              {unreadCount}
            </span>
          }
        </div>

        {unreadCount > 0 &&
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMarkAllRead}
          className="text-xs hover:bg-primary/10">

            <Check className="w-3 h-3 mr-1" />
            Mark all read
          </Button>
        }
      </div>

      {/* Notification List */}
      <ScrollArea className="flex-1">
        <AnimatePresence mode="popLayout">
          {isLoading ?
          // Skeleton Loader
          <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) =>
            <div key={i} className="flex gap-3 p-3 rounded-lg">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
            )}
            </div> :
          notifications.length === 0 ?
          // Empty State
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary/50" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                No notifications yet
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                We'll notify you when something happens
              </p>
            </div> :

          // Notification Items
          <div className="p-2">
              {notifications.map((notification, index) =>
            <motion.div
              key={notification.ID}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleNotificationClick(notification)}
              className={cn(
                "group relative p-3 rounded-lg cursor-pointer transition-all duration-300 mb-2",
                "hover:bg-accent/10",
                !notification.is_read &&
                "bg-primary/5 border border-primary/30 shadow-sm shadow-primary/20"
              )}>

                  {/* Neon Border for Unread */}
                  {!notification.is_read &&
              <motion.div
                className="absolute inset-0 rounded-lg border border-primary/50"
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} />

              }

                  <div className="relative flex gap-3">
                    {/* Icon */}
                    <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    notification.type === "payment" &&
                    "bg-green-500/10 text-green-400",
                    notification.type === "campaign" &&
                    "bg-blue-500/10 text-blue-400",
                    notification.type === "system" &&
                    "bg-purple-500/10 text-purple-400"
                  )}>

                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                      className={cn(
                        "text-sm font-semibold truncate",
                        !notification.is_read && "text-primary"
                      )}>

                          {notification.title}
                        </h4>

                        {/* Unread Indicator */}
                        {!notification.is_read &&
                    <div className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1" />
                    }
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {notification.message}
                      </p>

                      <p className="text-[10px] text-muted-foreground/60 mt-2">
                        {new Date(notification.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      }
                    )}
                      </p>
                    </div>
                  </div>
                </motion.div>
            )}
            </div>
          }
        </AnimatePresence>
      </ScrollArea>
    </div>);

};